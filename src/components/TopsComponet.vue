

<template>  
        
        
        <h2 class="text-center mt-4" >ESTADISTICAS</h2>
        
            <div class="d-grid gap-2 col-10 mx-auto mt-4 mb-4">
                <button class="btn btn-primary" type="button"
                @click="getTopByFields(useDatos.mes)"
                >Ver estadisticas de {{useDatos.mes}}</button>
            </div>

            <div v-if="useDatos.mes === useDatos.mesTopDia"  class="container mt-2 box-tops-data d-flex align-items-center" >
                <h6 class="text-start m-2" >TOP <b class="text-primary text-decoration-underline" >PACIENTES</b> CITAS INCUMPLIDAS 
                    <br>
                    <strong class="text-primary text-capitalize">{{ useDatos.mesTopDia}}</strong>
                </h6>
                
                    <!-- Arreglos -->
                    <div class="border p-3 m-2  rounded d-flex flex-column box-into-top" v-for="datospaciente of useDatos.pacienteTop" :key="datospaciente.id" >
                        <h2 class="text-primary text-center" > TOP {{(useDatos.pacienteTop.indexOf(datospaciente) + 1 )}} </h2>
                        
                    
                    <h6 class="text-center" >Nombre</h6>
                    <strong class="text-center mb-3" style="font-size: .6em;" >{{datospaciente[0].field9}} {{datospaciente[0].field10}}</strong>
                    <small class="text-center mb-2"><b class=" h6 bg-primary text-white p-1 rounded">{{datospaciente.length}}</b> citas incumplidas.</small>
                    </div>

            </div>

            <div v-if="useDatos.mes === useDatos.mesTopDia"  class="container mt-2 box-tops-data d-flex align-items-center" >
                <h6 class="text-start m-2" >TOP <b class="text-primary text-decoration-underline" >DIAS</b> CITAS INCUMPLIDAS 
                    <br>
                    <strong class="text-primary text-capitalize">{{ useDatos.mesTopDia}}</strong>
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
                <h6 class="text-start m-2" >TOP <b class="text-primary text-decoration-underline" >HORAS</b> CITAS INCUMPLIDAS 
                    <br>
                    <strong class="text-primary text-capitalize">{{ useDatos.mesTopDia}}</strong>
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

const useDatos = useDatosStore()
const { getTopByFields } = useExcel()

const months = ref([
  {id: "edfgh", mes: "febrero"}, {id: "f4wqd", mes: "marzo"}, {id: "wefe", mes: "abril"},
  {id: "3f3fjj", mes: "mayo"}, {id: "ifijf", mes: "junio"}, {id: "nsbd", mes: "julio"},
  {id: "idjdjd", mes: "agosto"}, {id: "skhdh", mes: "septiembre"}, {id: "msjs", mes: "octubre"},
])


</script>

<style scoped>

.box-tops-data{
    overflow-x: auto;
}

.box-into-top{
    width: 190px;
    min-width: 190px;
    background: rgb(2,0,36);
    background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,107,121,0) 0%, rgba(211,228,231,1) 82%, rgba(255,255,255,1) 100%);
    transition: .6s ease all;
    cursor: pointer;
}

.box-into-top:hover {
    box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;
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