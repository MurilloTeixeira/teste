<template>
    <h1>Aprendizes</h1>

    <button @click="criarNovo">Novo Aprendiz</button>

    <table class="centralized-table">
        <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Ações</th>
        </tr>
        <tr v-for="aprendiz in aprendizes" :key="aprendiz.id">
            <td>{{ aprendiz.id }}</td>
            <td>{{ aprendiz.nome }}</td>
            <td>
                <button @click="editarAprendiz(aprendiz.id)">Editar</button>|
                <button @click="confirmarDelecao(aprendiz.id)">Apagar</button>
            </td>
        </tr>
    </table>


</template>

<script>

import AprendizService from '@/services/aprendiz';

export default {

    data() {
        return {
            aprendizes: {}
        }
    },

    created() {

        this.listarAprendizes();
    },
    methods: {
        async listarAprendizes() {
            try {
                const response = await AprendizService.listar();
                this.aprendizes = response.data;
            } catch (error) {
                console.error('Erro ao listar aprendizes:', error);
            }
        },
        criarNovo() {
            this.$router.push('/aprendiz/novo');
        },
        editarAprendiz(id) {
            this.$router.push(`/aprendiz/${id}`);
        },
        async confirmarDelecao(id) {
            if (confirm('Tem certeza que deseja deletar este aprendiz?')) {
                try {
                    await AprendizService.apagar(id);
                    this.listarAprendizes(); // Atualizar a lista após a deleção
                } catch (error) {
                    console.error('Erro ao deletar aprendiz:', error);
                }
            }
        },
    },

}




</script>

<style>
/* Estilo para centralizar a tabela e definir a largura */
.centralized-table {
    width: 80%;
    margin: 0 auto;
    /* Centraliza a tabela */
    border-collapse: collapse;
    /* Remove os espaços entre as bordas das células */
}



/* Estilo para as linhas pares */
.centralized-table tr:nth-child(even) {
    background-color: #f9f9f9;
    /* Cor de fundo para linhas pares */
}

/* Estilo para as linhas ímpares */
.centralized-table tr:nth-child(odd) {
    background-color: #ffffff;
    /* Cor de fundo para linhas ímpares */
}

/* Estilo para as bordas das células */
.centralized-table th,
.centralized-table td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
}

/* Estilo para o cabeçalho da tabela */
.centralized-table th {
    background-color: #4CAF50;
    color: white;
}
</style>