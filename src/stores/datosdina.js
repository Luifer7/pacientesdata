

import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useDatosStore = defineStore('datos', () => {

  //Para los datos principales
  const data = ref([])
  const mes = ref('')
  const total = ref({})

  //Para los filtros
  const horas = ref([])
  const dias = ref([])
  const especialidad = ref([])

  //Para los datos de citas
  const incumplidos = ref([])
  const condonados = ref([])
  const incumplidaPagada = ref([])

  //Para las tarjetas de pacientes
  const topInasistentes = ref([])

  const filtroIncumplido = ref([])
  const busqueda = ref('')
  const busquedaDia = ref('')

  const citasPaciente = ref([])

 const spinner = ref(null)

 const topDia = ref([])
 const topHora = ref([])
 const mesTopDia = ref('')
 const pacienteTop = ref([])

 const show = ref(null)

 ///////////// MIGRACION ///////////
 const mesSeleccionado = ref({})

  return { data, horas, dias, especialidad, busquedaDia, mes, busqueda, total, incumplidos, 
           condonados, incumplidaPagada, topInasistentes, filtroIncumplido, 
           citasPaciente, spinner, topDia, topHora, mesTopDia, pacienteTop, show, mesSeleccionado }


})
