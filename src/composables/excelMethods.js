
import datos from "../../datos/data.json";
import  octubre  from "../../datos/octubre.json";
import  septiembre  from "../../datos/septiembre.json";
import  agosto  from "../../datos/agosto.json";
import  julio  from "../../datos/julio.json";
import  junio  from "../../datos/junio.json";
import  mayo  from "../../datos/mayo.json";
import  abril  from "../../datos/abril.json";
import  marzo  from "../../datos/marzo.json";
import  febrero  from "../../datos/febrero.json";

import { useDatosStore } from "../stores/datosdina";

export function useExcel() {

    const useDatos = useDatosStore()

    const readDatos =  (mes) => {

        useDatos.filtroIncumplido = []
        useDatos.mes = mes
        useDatos.total = []
        mes === 'octubre' ? useDatos.total = octubre.mes : false 
        mes === 'septiembre' ? useDatos.total = septiembre.mes :false 
        mes === 'agosto' ? useDatos.total = agosto.mes : false  
        mes === 'julio' ? useDatos.total = julio.mes : false
        mes === 'junio' ? useDatos.total = junio.mes : false
        mes === 'mayo' ? useDatos.total = mayo.mes : false
        mes === 'abril' ? useDatos.total = abril.mes : false
        mes === 'marzo' ? useDatos.total = marzo.mes : false
        mes === 'febrero' ? useDatos.total = febrero.mes : false
      
        try {

          useDatos.condonados =  useDatos.total.filter(field => field.field6 === 'Condonada')
          useDatos.incumplidos = useDatos.total.filter(field => field.field6 === "Incumplida")
          useDatos.data =  useDatos.total.filter(field => field.field6 != 'Incumplida Pagada')
          
           //Para Los pacientes        
        let resultadoInasistente = useDatos.data.reduce((k, e)=> {
          if (!k.find(d => d.field18 === e.field18)) {
            k.push(e)
          }
          return k
        }, [])
        useDatos.topInasistentes = resultadoInasistente
        // Pacientes end

        //Para las horas
        let resultado = useDatos.data.reduce((a, e)=> {
          if (!a.find(d => d.field5 === e.field5)) {
            a.push(e)
          }
          return a
        }, [])
        useDatos.horas = resultado

        //Para los dias
        let resultadoDia = useDatos.data.reduce((a, e)=> {
          if (!a.find(d => d.field4 === e.field4)) {
            a.push(e)
          }
          return a
        }, [])
        useDatos.dias = resultadoDia
       
        } catch (error) {
          
        }
       
       
    }
    // Se pone mayo por que es el que menos items tiene  y cargan mas rapido
    readDatos('mayo')
    

    //Ver detalles de paciente
    const getDetalles = (data) => {
      useDatos.citasPaciente = useDatos.data.filter(field => field.field18 === data.field18)
    }

    //FILTRO POR HORAS
    const filtroDos = (n) => {
        useDatos.busquedaDia = ''
        useDatos.busqueda = n
        useDatos.filtroIncumplido = []
        if (n === '') {
         return alert('Upp! peudes enviar un filtro vacio')
        }  
        useDatos.filtroIncumplido = useDatos.data.filter(field =>  field.field5 === n) 
    }
    
    //FILTRO POR DIAS
    const filtroTres = (d) => {

        if (d === '') {
          return alert('Upp! peudes enviar un filtro vacio')
        }  
        useDatos.busqueda = d

        let dd = new Date(d)
        useDatos.busquedaDia = dd.getDay()
        useDatos.busquedaDia === 1 ? useDatos.busquedaDia = 'Jueves' : false ||
        useDatos.busquedaDia === 2 ? useDatos.busquedaDia = 'Martes' : false ||
        useDatos.busquedaDia === 3 ? useDatos.busquedaDia = 'Miercoles' : false || 
        useDatos.busquedaDia === 4 ? useDatos.busquedaDia = 'Jueves' : false ||
        useDatos.busquedaDia === 5 ? useDatos.busquedaDia = 'Viernes' : false ||
        useDatos.busquedaDia === 6 ? useDatos.busquedaDia = 'Sabado' : false

        useDatos.filtroIncumplido = []
        useDatos.filtroIncumplido = useDatos.data.filter(field =>  field.field4 === d) 
    }

    const getAll = () => {
         useDatos.data = datos.filter(field => field.field6 != 'Incumplida Pagada')
    }

    const getTopByFields = (m) => {
      
      useDatos.mesTopDia = m

      let numeroVecesDia = []
      let numeroVecesHora = []

      useDatos.dias.forEach(element => {
        numeroVecesDia.push(useDatos.data.filter(field => field.field4 === element.field4))
      })
      useDatos.horas.forEach(element => {
        numeroVecesHora.push(useDatos.data.filter(field => field.field5 === element.field5))
      })
      
      useDatos.topDia = numeroVecesDia.sort().reverse()
      useDatos.topHora = numeroVecesHora.sort().reverse()
    }
    
      return {
        readDatos, filtroDos, filtroTres, getAll, getDetalles, getTopByFields
      }

}


