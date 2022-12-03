

<template>
    
     <!-- AGREGAR MES -->
     <div class="container d-flex justify-content-center align-items-center" >
        <div class="d-flex flex-column col-10" >
          <h5 class="mt-4 text-center" >Elige un mes <i class="bi bi-calendar3"></i> </h5>
          <form  class="d-flex gap-2" v-on:submit.prevent="(readDatos(selectedMonth))"  >
          <select style="height: 30px;"  v-model="selectedMonth" class="form-select  form-select-sm">
          <option  selected>Selecciona un mes</option>
          <option v-for="month of months" :key="month.id" :value="`${month.mes}`" >{{month.mes}}</option>
        
        </select>
        <button type="submit" class="btn btn-sm btn-primary btn-primary-outline">
          <i class="bi bi-check-square h6"></i>
        </button>
        </form>
        </div>
    </div>

   
</template>

<script setup >
import { ref } from "@vue/reactivity";
import { useExcel } from "../composables/excelMethods";
import { useDatosStore } from "../stores/datosdina";



const months = ref([
  {id: "edfgh", mes: "febrero"}, {id: "f4wqd", mes: "marzo"}, {id: "wefe", mes: "abril"},
  {id: "3f3fjj", mes: "mayo"}, {id: "ifijf", mes: "junio"}, {id: "nsbd", mes: "julio"},
  {id: "idjdjd", mes: "agosto"}, {id: "skhdh", mes: "septiembre"}, {id: "msjs", mes: "octubre"},
])

const selectedMonth = ref('')

const useDatos = useDatosStore()
const { readDatos } = useExcel()





</script>