


<template>
    
    <div class="container" >
        <input type="file" id="newfile" class="form-control form-control-sm" 
        @change="UploadFile()"
        >
    </div>

</template>

<script setup >
import { ref } from "@vue/reactivity";
import readXlsFile from "read-excel-file";

const item = ref([])

const UploadFile = () => {
    const input = document.getElementById("newfile")
    readXlsFile(input.files[0]).then((rows) => {
        item.value = rows
        console.log(item.value)
    })
}

</script>

<style scoped>


</style>