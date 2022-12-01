

<template>

  <div class="general" >

    <!-- AGREGAR MES -->
    <div class="container" >
      <div class="d-flex flex-column" >
          <h4 class="mt-4 text-center" >Escoge un mes <i class="bi bi-calendar3"></i> </h4>
          <form class="d-flex gap-2" v-on:submit.prevent="(readDatos(mes))"  >
          <select v-model="mes" class="form-select  form-select-sm" aria-label="Default select example">
          <option selected>Filtrar por Horas</option>
          <option v-for="month of months" :key="month.id" :value="`${month.mes}`" >{{month.mes}}</option>
        
        </select>
        <button type="submit" class="btn btn-sm btn-primary">
          <i class="bi bi-check2-square"></i>
        </button>
        </form>
        </div>
    </div>

    <!-- Spinner -->
    <div v-if="useDatos.spinner" class="container text-center m-2 p-3 m-auto">
    <div class="spinner-border " role="status">
      <span class="visually-hidden">Loading...</span>
   </div>
    </div>

    <!-- Datos generales -->
    <div class="container p-2" >
      <div class="m-3 text-justify" >
        <h1 style="font-size: 1.7em;" class="h3 m-3 text-center" >Total citas Incumplidas en <b class="text-primary text-uppercase">{{useDatos.mes}}: </b><b class="text-success">{{useDatos.data.length}}</b></h1>
      </div>
    <div class="d-flex align-items-center justify-content-evenly gap-3 flex-wrap mt-1" >
      <strong class="h6 text-center" >Incumplidas <br> <b class="text-success h4">{{useDatos.incumplidos.length}}</b></strong>
      <strong class="h6 text-center" >Condonadas <br> <b class="text-success h4">{{useDatos.condonados.length}}</b></strong> 
    </div>
    </div>
    
    <!-- Pacientes -->
    <h5 class="text-center text-primary fw-bold mt-4" >{{useDatos.topInasistentes.length}} Pacientes <b class="text-uppercase" >{{useDatos.mes}}</b> </h5>
    <div class="mt-3" >
      <input type="text" v-model="queryMasBuscados" placeholder="Buscar por nombre" class="form-control form-control-sm w-50 m-auto">
    </div>
     
        <!-- CARD PACIENTES -->
  
       <div class="container p-3 m-auto d-flex box-top flex-column" >
        
        <span class="text-center text-primary d-flex align-items-center justify-content-center">
          <i class="bi bi-funnel-fill h5">{{getMasBuscado().length}}</i>
        </span>

        <div class="d-flex box-top" >
          <div v-for="top of getMasBuscado()" :key="top.field8" class="border box-user p-2 d-flex flex-column gap-2">
            
            <span  class="nombres text-primary" :class="isCopy && top.field8 === current ? 'bg-primary p-1 rounded text-white' : ''">
              <b>{{top.field9}} {{top.field10}}</b>
            </span> 
            
            <span class="nombres" :class="isCopy && top.field8 === current ? 'bg-primary p-1 rounded text-white' : ''">
              <i class="bi bi-telephone-fill"></i> <b>{{top.field11}}</b>
            </span> 

            <span class="email" :class="isCopy && top.field8 === current ? 'bg-primary p-1 rounded text-white' : ''"><b>{{top.field13}}</b>
            </span>

            <span class="nombres" :class="isCopy && top.field8 === current ? 'bg-primary p-1 rounded text-white' : ''">
              <b>CC:{{top.field8}}</b>
            </span>
            
            <i @click="copyClipboard(top)" class="bi bi-clipboard-check-fill text-center m-2 copy"><small class="copytex" >Copiar datos</small></i>
            <i  @click="getDetalles(top)" data-bs-toggle="modal" data-bs-target="#detallescitas"
                class="bi bi-hand-index text-center m-2 h4 copy"> <small class="copytex" > Ver detalles</small> </i>

        </div>
        </div>
      </div>
     
    <!-- Pacientes ENDD -->







    <!-- FILTROS -->
    <div class=" border filtros m-auto  p-3 mt-4" >


      <h3 class="text-center mb-3 text-primary" >FILTROS</h3>
      
      <div class="box-btn d-flex gap-3 flex-wrap justify-content-center align-items-start" >

        <!-- Filtro por hora -->
        <div class="d-flex flex-column" >
          <small class="fw-bold m-1 text-primary" style="font-size: .9em;"  >
            <b class="text-danger" >Incumplidas</b>
            por hora</small>
          <form class="d-flex gap-2" v-on:submit.prevent="filtroDos(h)"  >
          <select v-model="h" class="form-select" aria-label="Default select example">
          <option selected>Filtrar por Horas dd</option>
          <option v-for="hora of useDatos.horas" :key="hora.id" :value="`${hora.field5}`" >{{hora.field5}}</option>
        
        </select>
        <button type="submit" class="btn btn-sm btn-primary">Filtrar</button>
        </form>
        </div>

        <!-- Filtro por dia -->
        <div class="d-flex flex-column" >
          <small class="fw-bold m-1 text-primary" style="font-size: .9em;"  >
            <b class="text-danger" >Incumplidas</b>
            por dia</small>
          <form class="d-flex gap-2" v-on:submit.prevent="filtroTres(dia)"  >
          <select v-model="dia" class="form-select" aria-label="Default select example">
          <option selected>Filtrar por dias</option>
          <option v-for="dia of useDatos.dias" :key="dia.id" :value="`${dia.field4}`" >{{dia.field4}}</option>
        
        </select>
        <button type="submit" class="btn btn-sm btn-primary">Filtrar</button>
        </form>
        </div>
      
      </div>

      <h5 class="text-center mt-4 text-dark fw-bold" >Resultados de
        <b style="text-decoration: underline;" class="text-primary"><b>{{useDatos.busquedaDia}} </b> {{useDatos.busqueda}}</b> <br> <strong class="m-1 text-dark" > <b style="text-decoration: underline;" class="text-primary" >{{getFiltradas().length}}</b> citas en <b style="text-decoration: underline;" class="text-primary" >{{useDatos.mes}}</b></strong></h5>
      <div class="mt-3" >
      <input type="text" v-model="queryFiltradas" placeholder="Buscar por hora ejemplo: 2:30PM" class="form-control form-control-sm w-50 m-auto">
    </div>

    <!-- CONTAINER CONTENIDO -->
      <div class="container m-auto d-flex box-top mt-3" >
        <div v-for="top of getFiltradas()" :key="top.id" class="box-user bb p-2">
          <div class="p-2" style="font-size: .8em;" >
            <h6 class="text-success text-center fw-bold" >Datos de la cita</h6>
            <strong>Hora: {{top.field5}}</strong> <br> <small> Dia: {{top.field4}}</small> <br>
            <strong class="fw-bold" v-if="top.field6 === 'Incumplida'" >Cita: <small class="text-danger" >{{top.field6}}</small> </strong>
            <strong class="fw-bold" v-if="top.field6 === 'Condonada'" >Cita: <small class="text-warning" >{{top.field6}}</small> </strong>
            <strong class="fw-bold" v-if="top.field6 === 'Incumplida Pagada'" >Cita: <small class="text-success" >{{top.field6}}</small> </strong>
          </div>

          <div class="p-2 m-1 d-flex flex-column" >
            <h6 class="text-success text-center fw-bold" >Paciente de la cita</h6>
            <span class="nombres text-primary fw-bold" :class="isCopy && top.field8 === current ? 'bg-primary text-white' : ''" ><b>{{top.field9}} {{top.field10}}</b></span> 
            <span class="nombres" :class="isCopy && top.field8 === current ? 'bg-primary text-white' : ''" >Tel: <b>{{top.field11}}</b></span> 
            <span class="email" :class="isCopy && top.field8 === current ? 'bg-primary text-white' : ''" ><b>{{top.field13}}</b></span> 
            <span class="nombres mt-1" :class="isCopy && top.field8 === current ? 'bg-primary text-white' : ''">
             <b>CC:{{top.field8}}</b>
          </span>
            
            <i @click="copyClipboard(top)" class="bi bi-clipboard-check-fill text-center m-3 copy"><small class="copytex" >Copiar datos</small></i>
          </div>
      
        </div>

      </div>
      
    </div>



      <!-- Modal -->
      <div class="modal fade" id="detallescitas" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5">
                {{useDatos.citasPaciente[0]?.field9}} {{useDatos.citasPaciente[0]?.field10}}
                <i class="bi bi-person-circle h3"></i>
              </h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <div class="modal-body">
              <h5>Citas Incumplidas: {{useDatos.citasPaciente.length}}</h5>

              <div v-for="citas of useDatos.citasPaciente" :key="citas.id" >

                <div class="border p-2 rounded d-flex flex-column mb-2" style="font-size: .8em;" >
                  <span class="m-1 text-info fw-bold">Info cita</span>
                  <span><strong>Sede: </strong>{{citas.field1}}</span>
                  <span><strong>Especialidad: </strong> {{citas.field2}}</span>
                  <span><strong>Medico: </strong> {{citas.field3}}</span>
                  <span><strong>Dia: </strong> {{citas.field4}}</span>
                  <span><strong>Hora: </strong> {{citas.field5}}</span>
                  <span><strong>Estado: </strong> <b class="text-danger">{{citas.field6}}</b> </span>
                  <span><strong>Codigo: </strong> {{citas.field7}}</span>
                </div>
              </div>

            </div>

            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>


  </div>

</template>




<script setup>
import { ref } from '@vue/reactivity';
import { useExcel } from '../composables/excelMethods';
import { useDatosStore } from '../stores/datosdina';

const useDatos = useDatosStore()
const { readDatos, filtroDos, filtroTres, getAll, getDetalles } = useExcel()

const months = ref([
  {id: "edfgh", mes: "febrero"}, {id: "f4wqd", mes: "marzo"}, {id: "wefe", mes: "abril"},
  {id: "3f3fjj", mes: "mayo"}, {id: "ifijf", mes: "junio"}, {id: "nsbd", mes: "julio"},
  {id: "idjdjd", mes: "agosto"}, {id: "skhdh", mes: "septiembre"}, {id: "msjs", mes: "octubre"},
])

//Para el mes
const mes = ref('')

//Para filtros
const numero = ref('')
const h = ref('')
const dia = ref('')

//Para el copy
const isCopy = ref(null)
const current = ref('')

  const copyClipboard = (texto) => {
      
      let copyText = `${texto.field9} ${texto.field10} | Telefono: ${texto.field11} Correo: ${texto.field13} CC: ${texto.field8} `
      current.value = texto.field8
      try {
          navigator.clipboard.writeText(copyText)
          isCopy.value = true
         
          function copied(){
            isCopy.value = false
          }

          setTimeout(copied, 800);
         
       } catch (error) {
       console.log(error)
      } 
  } 

  //Filtrar por nombre function
  const queryMasBuscados = ref('')
  const getMasBuscado = () => {
    return useDatos.topInasistentes.filter(field => field.field9.includes(queryMasBuscados.value.toUpperCase()))
  } 
  
  //Filtro por horas function
  const queryFiltradas = ref('')
  const getFiltradas = () => {
     return useDatos.filtroIncumplido.filter(field => field.field5.includes(queryFiltradas.value.toUpperCase()))
  } 

  //Filtro por cedula de todas
  const queryAll = ref('')
  const getAllFiltradas = () => {
     return useDatos.data.filter(field => field.field9.includes(queryAll.value.toUpperCase()))
  } 

 

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@0,300;0,400;0,500;0,600;0,700;1,200;1,300;1,400;1,700&display=swap');
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.2/font/bootstrap-icons.css");
@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;700&display=swap');
.general {
  font-family: 'Oswald', sans-serif;
}

.filtros {
  background: rgb(2,0,36);
background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,107,121,0) 0%, rgba(211,228,231,1) 82%, rgba(255,255,255,1) 100%);
}

.caja-datos{
  border: 2px solid rgba(35, 35, 219, 0.26);
  border-radius: 10px;
  padding: 10px;
}

.box-top{
  overflow-y: auto;
  border-radius: 10px;
}

.bb {
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

.box-user{
  width: 260px;
  min-width: 260px;
  margin: 10px;
  border-radius: 10px;
  cursor: pointer;
  transition: .6s ease all;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  background: rgb(2,0,36);
background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,107,121,0) 0%, rgba(211,228,231,1) 82%, rgba(255,255,255,1) 100%);
}

.box-user:hover{
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px, rgb(51, 51, 51) 0px 0px 0px 3px;
}

.nombres{
  font-size: .8em;
  text-transform: lowercase;
}
.email {
  font-size: .7em;
  text-decoration: underline;
  color: rgba(0, 0, 255, 0.753);
}

.copy {
  cursor: pointer;
  transition: .4s ease all;
  font-size: 20px;
  color: rgba(27, 27, 211, 0.795);
}
.copy:hover {
  color: rgba(2, 2, 10, 0.822);
  transform: scale(1.1);
}
.copytex {
  font-size: .6em;
  font-weight: bold;
}

</style>