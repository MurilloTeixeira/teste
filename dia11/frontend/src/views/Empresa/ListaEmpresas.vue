<template>
    <h1>Empresas</h1>


    <button @click="criarNova">Nova Empresa</button>

    <table class="centralized-table">
        <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Ações</th>
        </tr>
        <tr v-for="empresa in empresas" :key="empresa.id">
            <td>{{ empresa.id }}</td>
            <td>{{ empresa.nome }}</td>
            <td>
                <button @click="editarEmpresa(empresa.id)">Editar</button>|
                <button @click="confirmarDelecao(empresa.id)">Apagar</button>
            </td>
        </tr>
    </table>

</template>

<script>
import EmpresaService from '@/services/empresa';

export default {
    data() {
        return {
            empresas: []

        }
    },

    created() {

        this.listarEmpresas();
    },


    methods: {
        async listarEmpresas() {
            try {
                const response = await EmpresaService.listar();
                this.empresas = response.data;
            } catch (error) {
                console.error('Erro ao listar empresas:', error);
                alert('Erro ao listar empresas');
            }
        },
        criarNova() {
            this.$router.push('/empresa/nova');
        },
        editarEmpresa(id) {
            this.$router.push(`/empresa/${id}`);
        },
        async confirmarDelecao(id) {
            if (confirm('Tem certeza que deseja deletar esta empresa?')) {
                try {
                    await EmpresaService.apagar(id);
                    this.listarEmpresas(); // Atualizar a lista após a deleção
                } catch (error) {
                    console.error('Erro ao deletar empresa:', error);

                    alert('Erro ao deletar empresa');
                }
            }
        }
    }
};

</script>

<style>
/* Estilo para centralizar a tabela e definir a largura */
.centralized-table {
    width: 80%;

    margin: 0 auto; /* Centraliza a tabela */
    border-collapse: collapse; /* Remove os espaços entre as bordas das células */
}

/* Estilo para as linhas pares */
.centralized-table tr:nth-child(even) {
    background-color: #f9f9f9; /* Cor de fundo para linhas pares */

}

/* Estilo para as linhas ímpares */
.centralized-table tr:nth-child(odd) {

    background-color: #ffffff; /* Cor de fundo para linhas ímpares */

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

