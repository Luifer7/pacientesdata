

<template>
  
  <button @click="descargarExcel(datos)" class="dowload">
    <i class="bi bi-cloud-download-fill h4 icon-dowload"></i>
  </button>

</template>

<script setup>
import readXlsFile from "read-excel-file";
import exportFromJSON from "export-from-json";
import { ref } from "@vue/reactivity";

defineProps({
  datos: Object,
});

const descargarExcel = (datos) => {
  const data = datos;
  const fileName = `dowload${Date.now()}`;
  const exportType = exportFromJSON.types.xls;
  exportFromJSON({ data, fileName, exportType });
};
</script>

<style scoped>
.dowload {
  height: 30px;
  font-weight: bold;
  outline: none;
  border: none;
  background: transparent;
  transition: 0.5s ease all;
}

.icon-dowload {
  color: #1a51b8;
  transition: 0.5s ease all;
}
.icon-dowload:hover {
  color: #14a751;
  font-weight: bold;
}

.dowload:hover {
  transform: scale(1.2);
}
</style>
