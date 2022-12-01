

<template>

  
  <div class="box-header  d-flex align-items-center justify-content-center" >
    <strong class="text-success fw-bold h3" >Excel Datos Admin Dashboard</strong>
  </div>  

  <RouterView />

  <div class="box-footer d-flex align-items-center justify-content-center flex-column p-2" >
   
      <strong>Developed by: <i class="text-dark" >Luis Fernando Cordero Torres</i> </strong>
      <cite title="Source Title">luiswfernando7@gmail.com</cite>
 
  </div>

</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'

</script>


<style scoped>
.box-header {
  width: 100%; height: 100px;
  background: rgb(2,0,36);
background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,107,121,0) 0%, rgba(211,228,231,1) 82%, rgba(255,255,255,1) 100%);
}

.box-footer {
  width: 100%; height: 100px;
}


</style>