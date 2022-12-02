<template>
    
      <div class="box-header d-flex p-2  align-items-center justify-content-around flex-wrap">
       
        <div class="d-flex" style="height: 20px;" >
          <form
            class="d-flex align-items-center justify-content-center gap-2"
            v-on:submit.prevent="readDatos(month)"
          >
            <select
              style="height: 34px; width: 300px;"
              v-model="month"
              class="form-select form-select-sm"
              aria-label="Default select example"
            >
              <option selected>Filtrar por Horas</option>
              <option
                v-for="month of months"
                :key="month.id"
                :value="`${month.mes}`"
              >
                {{ month.mes }}
              </option>
            </select>
            <button
              type="submit"
              class="btn btn-sm btn-primary btn-primary-outline"
            >
              <i class="bi bi-check-square"></i>
            </button>
          </form>
        </div>

      </div>

      <!-- Hidden componnet -->
      <div
        class="box-header-hide d-flex align-items-center justify-content-center"
      ></div>

      <!-- Home  view-->
      <RouterView />
      <!-- Home view -->

      <div
        class="box-footer d-flex align-items-center justify-content-center flex-column p-2 mt-5"
      >
        <strong
          >Developed by: <i class="text-dark">Luis Fernando Cordero Torres</i>
        </strong>
        <cite title="Source Title">luiswfernando7@gmail.com</cite>
        <small>Copyright&copy; 2022</small>
      </div>

</template>

<script setup>
import { ref } from "@vue/reactivity";
import { RouterLink, RouterView } from "vue-router";
import SelectComponent from "./components/SelectComponent.vue";
import { useExcel } from "./composables/excelMethods";
import { useDatosStore } from "./stores/datosdina";

const useDatos = useDatosStore();
const { readDatos } = useExcel();

const month = ref("");

const months = ref([
  { id: "edfgh", mes: "febrero" },
  { id: "f4wqd", mes: "marzo" },
  { id: "wefe", mes: "abril" },
  { id: "3f3fjj", mes: "mayo" },
  { id: "ifijf", mes: "junio" },
  { id: "nsbd", mes: "julio" },
  { id: "idjdjd", mes: "agosto" },
  { id: "skhdh", mes: "septiembre" },
  { id: "msjs", mes: "octubre" },
]);
</script>

<style scoped>
.box-header {
  width: 100%;
  height: 100px;
  background: rgb(2, 0, 36);
  background: linear-gradient(
    90deg,
    rgba(2, 0, 36, 1) 0%,
    rgba(9, 107, 121, 0) 0%,
    rgba(211, 228, 231, 1) 82%,
    rgba(255, 255, 255, 1) 100%
  );
  position: fixed;
  border-bottom: 2px solid rgba(112, 111, 111, 0.137);
}
.box-header-hide {
  width: 100%;
  height: 100px;
  background: rgb(2, 0, 36);
  background: linear-gradient(
    90deg,
    rgba(2, 0, 36, 1) 0%,
    rgba(9, 107, 121, 0) 0%,
    rgba(211, 228, 231, 1) 82%,
    rgba(255, 255, 255, 1) 100%
  );
}

.box-footer {
  width: 100%;
  height: 100px;
  background: rgb(2, 0, 36);
  background: linear-gradient(
    90deg,
    rgba(2, 0, 36, 1) 0%,
    rgba(9, 107, 121, 0) 0%,
    rgba(211, 228, 231, 1) 82%,
    rgba(255, 255, 255, 1) 100%
  );
  font-size: 0.7em;
}
</style>
