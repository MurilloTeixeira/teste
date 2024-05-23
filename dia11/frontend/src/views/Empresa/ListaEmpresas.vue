
<template>
    <div>
        <h1>Empresas</h1>
        <table>
            <tr>
                <td>id</td>
                <td>Nome</td>
            </tr>
            <tr v-for="empresa in empresas" :key="empresa.id">
                <td>empresa.id</td>
                <td>empresa.nome</td>
            </tr>
        </table>
    </div>
</template>

<script>
import EmpresaService from "@/services/"

</script>

<style>

</style>