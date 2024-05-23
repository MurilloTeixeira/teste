<template>
    <div>
        <h1>{{ id ? 'Editar Empresa' : 'Adicionar Empresa' }}</h1>
        <form @submit.prevent="salvar" class="form-container">
            <div>
                <label for="nome">Nome:</label>
                <input type="text" v-model="empresa.nome" id="nome" required>
            </div>
            <div>
                <label for="nomeFantasia">Nome Fantasia:</label>
                <input type="text" v-model="empresa.nomeFantasia" id="nomeFantasia" required>
            </div>
            <div>
                <label for="enderecoCompleto">Endereço Completo:</label>
                <input type="text" v-model="empresa.enderecoCompleto" id="enderecoCompleto" required>
            </div>
            <div>
                <label for="cnpjCpf">CNPJ/CPF:</label>
                <input type="text" v-model="empresa.cnpjCpf" id="cnpjCpf" required>
            </div>
            <div>
                <label for="telefone">Telefone:</label>
                <input type="text" v-model="empresa.telefone" id="telefone" required>
            </div>
            <div>
                <label for="emails">E-mails:</label>
                <input type="text" v-model="empresa.emails" id="emails" required>
            </div>
            <div>
                <label for="valorTaxaAdministrativa">Valor da Taxa Administrativa:</label>
                <input type="number" v-model="empresa.valorTaxaAdministrativa" id="valorTaxaAdministrativa" required>
            </div>
            <div>
                <label for="cobraTaxa">Cobra Taxa:</label>
                <input type="checkbox" v-model="empresa.cobraTaxa" id="cobraTaxa">
            </div>
            <button type="submit">Salvar</button>
        </form>
    </div>
</template>

<script>
import EmpresaService from '@/services/empresa';

export default {
    data() {
        return {
            empresa: {
                nome: '',
                nomeFantasia: '',
                enderecoCompleto: '',
                cnpjCpf: '',
                telefone: '',
                emails: '',
                valorTaxaAdministrativa: 0,
                cobraTaxa: true
            },
            id: null
        };
    },
    created() {
        this.id = this.$route.params.id;
        if (this.id) {
            this.obterEmpresa(this.id);
        }
    },
    methods: {
        async obterEmpresa(id) {
            try {
                const response = await EmpresaService.obter(id);
                this.empresa = response.data;
            } catch (error) {
                console.error('Erro ao obter empresa:', error);
            }
        },
        async salvar() {
            try {
                if (this.id) {
                    await EmpresaService.gravar({ ...this.empresa, id: this.id });
                } else {
                    await EmpresaService.gravar(this.empresa);
                }
                this.$router.push('/empresas'); // Navegar de volta para a lista de empresas após salvar
            } catch (error) {
                console.error('Erro ao salvar empresa:', error);
            }
        }
    }
};
</script>

<style scoped>
.form-container {
    border: 1px solid #ccc;
    padding: 20px;
    border-radius: 8px;
    width: 80%;
    margin: auto;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-color: #f9f9f9;
}

.form-container div {
    display: flex;
    align-items: center;
    margin-bottom: 1em;
}

.form-container label {
    width: 200px;
    margin-right: 10px;
    text-align: right;
}

.form-container input[type="text"],
.form-container input[type="number"],
.form-container input[type="checkbox"] {
    flex: 1;
    padding: 5px;
}

.form-container button {
    align-self: flex-start;
    padding: 10px 20px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.form-container button:hover {
    background-color: #45a049;
}
</style>
