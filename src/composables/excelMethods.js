

import { 
collection, addDoc, query, onSnapshot, orderBy,
doc, deleteDoc, updateDoc, getDoc, getDocs } from "firebase/firestore";
import {  db, auth } from "../firebase";
import { useDatosStore } from "../stores/datosdina";


export function useExcel() {

    // PINIA ES GOD 
    const useDatos = useDatosStore()
    
    // Funcion para agregar nuevo archivo excel
    const addExcelData = async (archivo) => {
      let barrera = 0
      if (barrera === 1) {
        console.log("Add excel")
        try {
        const datosRef = await addDoc(collection(db, "septiembre"), {
          archivo
        })
        } catch (error) {
            console.log(error)
        }
      }
   }


    // La que lo hace todo XD
    const readDatos = async (mes) => {
        useDatos.spinner = true
        useDatos.show = false
        useDatos.filtroIncumplido = []
        useDatos.mes = mes
        useDatos.total = {}
        useDatos.data = []
        const querySnapshot = await getDocs(collection(db, `${mes}`));
        querySnapshot.forEach((doc) => {
           useDatos.total = doc.data().archivo[`${mes}`]
        })
        useDatos.spinner = false

        try {

          useDatos.condonados = await useDatos.total.filter(field => field.field6 === 'Condonada')
          useDatos.incumplidos = await useDatos.total.filter(field => field.field6 === "Incumplida")
          useDatos.data = await useDatos.total.filter(field => field.field6 != 'Incumplida Pagada')
          
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

          let resultadoEspecialidad = useDatos.data.reduce((a, e)=> {
            if (!a.find(d => d.field2 === e.field2)) {
              a.push(e)
            }
            return a
          }, [])
          useDatos.especialidad = resultadoEspecialidad
          
          await getTopByFields(useDatos.mes)
          } catch (error) {
            
          }
         
    }

    //Se pone mayo por que es el que menos items tiene  y cargan mas rapido
    readDatos('mayo')
    
    



    //Ver detalles de paciente
    const getDetalles = (data) => {
      useDatos.citasPaciente = useDatos.data.filter(field => field.field18 === data.field18)
    }

    //FILTRO POR HORAS
    const filtroDos = (n) => {
        useDatos.show = true
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
      useDatos.show = true
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

    const filtroCuatro = (e) => {
      useDatos.show = true
      useDatos.busquedaDia = ''
      useDatos.busqueda = e
      useDatos.filtroIncumplido = []
      if (e === '') {
       return alert('Upp! peudes enviar un filtro vacio')
      }  
      useDatos.filtroIncumplido = useDatos.data.filter(field =>  field.field2 === e) 

  }



    // La de los tops, se carga em vista o en el componente
    const getTopByFields = (m) => {
      
      useDatos.mesTopDia = m

      let numeroVecesDia = []
      let numeroVecesHora = []
      let numeroVecesPaciente = []

      useDatos.dias.forEach(element => {
        numeroVecesDia.push(useDatos.data.filter(field => field.field4 === element.field4))
      })

      useDatos.horas.forEach(element => {
        numeroVecesHora.push(useDatos.data.filter(field => field.field5 === element.field5))
      })

      useDatos.topInasistentes.forEach(element => {
        numeroVecesPaciente.push(useDatos.data.filter(field => field.field8 === element.field8))
      })
      
      useDatos.topDia = numeroVecesDia.sort().reverse().splice(0, 50)
      useDatos.topHora = numeroVecesHora.sort().reverse().splice(0, 50)
      useDatos.pacienteTop = numeroVecesPaciente.sort().reverse().splice(0, 30) 
     
    }
    
      return {
        readDatos, filtroDos, filtroTres, getDetalles, getTopByFields, addExcelData, filtroCuatro
      }

}


