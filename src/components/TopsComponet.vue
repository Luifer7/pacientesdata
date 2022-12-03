

<template>  
        
        
        <h2 class="text-center mt-4" >ESTADISTICAS</h2>
        
            <div class="d-grid gap-2 col-10 mx-auto mt-4 mb-4">
                <button class="btn btn-primary" type="button"
                @click="getTopByFields(useDatos.mes)"
                >Ver estadisticas de {{useDatos.mes}}</button>
            </div>

            <div v-if="useDatos.mes === useDatos.mesTopDia"  class="container mt-2 box-tops-data d-flex align-items-center" >
                <h6 class="m-2 d-flex flex-column" >TOP <b class="text-primary text-decoration-underline" >PACIENTES</b> CITAS INCUMPLIDAS 
                    <br>
                    <strong class="text-primary text-capitalize">{{ useDatos.mesTopDia}}</strong> <br>
                    <DowloadComponent :datos="topPaciente()" ></DowloadComponent>
                </h6>
                
                    <!-- Arreglos -->
                    <div class="border p-3 m-2  rounded d-flex flex-column box-into-top" v-for="datospaciente of useDatos.pacienteTop" :key="datospaciente.id" >
                        <h2 class="text-primary text-center" > TOP {{(useDatos.pacienteTop.indexOf(datospaciente) + 1 )}} </h2>
                        
                    
                    <h6 class="text-center" >Nombre</h6>
                    <strong class="mb-1" style="font-size: .6em;" >{{datospaciente[0].field9}} {{datospaciente[0].field10}}</strong>
                    <strong class="mb-1 text-primary" style="font-size: .6em;">{{datospaciente[0].field13}}</strong>
                    <strong class="mb-1 text-primary mb-2" style="font-size: .7em;" >CC: {{datospaciente[0].field8}}</strong>
                    <strong  class="mb-1 mt-1 d-flex align-items-center justify-content-evenly" style="font-size: .7em;">
                        <i class="bi bi-telephone-fill d-flex align-items-center"> 
                         <b class="m-1" 
                         :class="isCopy && datospaciente[0].field11 === current ?'bg-primary text-white p-1 rounded':''"
                         >{{datospaciente[0].field11}}</b>
                        </i> 
                        <i @click="copynumber(datospaciente[0].field11)" class="bi bi-clipboard2-check h4 m-0 mb-1 copy-cel"></i></strong>

                    <small class="text-center mb-2 mt-2"><b class=" h6 bg-primary text-white p-1 rounded">{{datospaciente.length}}</b> citas incumplidas.</small>
                    </div>

            </div>

            <div v-if="useDatos.mes === useDatos.mesTopDia"  class="container mt-2 box-tops-data d-flex align-items-center" >
                <h6 class="m-2 d-flex flex-column" >TOP <b class="text-primary text-decoration-underline" >DIAS</b> CITAS INCUMPLIDAS 
                    <br>
                    <strong class="text-primary text-capitalize">{{ useDatos.mesTopDia}}</strong> <br>
                    <DowloadComponent :datos="topDia()" ></DowloadComponent>
                </h6>
                    
                    <!-- Arreglos -->
                    <div class="border p-3 m-2  rounded d-flex flex-column box-into-top" v-for="datosdia of useDatos.topDia" :key="datosdia.id" >
                        <h2 class="text-primary text-center" > TOP {{(useDatos.topDia.indexOf(datosdia) + 1 )}} </h2>
                        
                    
                    <h6 class="text-center" >DIA</h6>
                    <strong class="text-center mb-3" style="font-size:small;" >{{datosdia[0].field4}}</strong>
                    <small class="text-center mb-2"><b class=" h6 bg-primary text-white p-1 rounded">{{datosdia.length}}</b> citas incumplidas.</small>
                    </div>

            </div>

            <div v-if="useDatos.mes === useDatos.mesTopDia"  class="container mt-4 box-tops-data d-flex align-items-center" >
                <h6 class="m-2 d-flex flex-column" >TOP <b class="text-primary text-decoration-underline" >HORAS</b> CITAS INCUMPLIDAS 
                    <br>
                    <strong class="text-primary text-capitalize">{{ useDatos.mesTopDia}}</strong> <br>
                    <DowloadComponent :datos="topHora()" ></DowloadComponent>
                </h6>
                    
                    <!-- Arreglos -->
                    <div class="border p-3 m-2  rounded d-flex flex-column box-into-top" v-for="datoshora of useDatos.topHora" :key="datoshora.id" >
                        <h2 class="text-primary text-center" > TOP {{(useDatos.topHora.indexOf(datoshora) + 1 )}} </h2>
                        
                    
                    <h6 class="text-center" >HORA</h6>
                    <strong class="text-center mb-3" style="font-size:small;" >{{datoshora[0].field5}}</strong>
                    <small class="text-center mb-2"><b class=" h6 bg-primary text-white p-1 rounded">{{datoshora.length}}</b> citas incumplidas.</small>
                    </div>

            </div>
        

</template>


<script setup >

import { ref } from "@vue/reactivity";
import { useExcel } from "../composables/excelMethods";
import { useDatosStore } from "../stores/datosdina";
import DowloadComponent from "./DowloadComponent.vue";

const useDatos = useDatosStore()
const { getTopByFields } = useExcel()

const months = ref([
  {id: "edfgh", mes: "febrero"}, {id: "f4wqd", mes: "marzo"}, {id: "wefe", mes: "abril"},
  {id: "3f3fjj", mes: "mayo"}, {id: "ifijf", mes: "junio"}, {id: "nsbd", mes: "julio"},
  {id: "idjdjd", mes: "agosto"}, {id: "skhdh", mes: "septiembre"}, {id: "msjs", mes: "octubre"},
])

const isCopy = ref(null)
const current = ref('')
const copynumber = (n) => {
    let copyText = `${n}`
      current.value = n
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

const arrTop = ref([])

const topPaciente = () => {
    let top = []
        useDatos.pacienteTop.forEach((element) => {
        top.push(element[0])
    })

    return top
}

const topHora = () => {
    let top = []
        useDatos.topHora.forEach((element) => {
        top.push(element[0])
    })
    
    return top
}

const topDia = () => {
    let top = []
        useDatos.topDia.forEach((element) => {
        top.push(element[0])
    })
    
    return top
}







</script>

<style scoped>

.box-tops-data{
    overflow-x: auto;
}

.box-into-top{
    width: 1110px;
    min-width: 190px;
    background: rgb(2,0,36);
    background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,107,121,0) 0%, rgba(211,228,231,1) 82%, rgba(255,255,255,1) 100%);
    transition: .6s ease all;
    cursor: pointer;
}

.box-into-top:hover {
    box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;
}

.copy-cel {
    transition: .6s ease all;
}

.copy-cel:hover {
    color: rgba(17, 17, 199, 0.904);
    transform: scale(1.2);
}


::-webkit-scrollbar
{
	width: 5px;
}


::-webkit-scrollbar-thumb
{
	background-color: #74b9ff;
	border-radius: 10px;
}



</style>