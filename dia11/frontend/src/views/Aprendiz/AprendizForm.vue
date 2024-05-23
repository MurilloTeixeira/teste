<template>
    <div>
        <h1>{{ id ? 'Editar Aprendiz' : 'Adicionar Aprendiz' }}</h1>
        <form @submit.prevent="salvar" class="form-container">
            <div>
                <label for="matricula">Matrícula:</label>
                <input type="number" v-model="aprendiz.matricula" id="matricula" required>
                <span v-if="errors.matricula" class="error">{{ errors.matricula }}</span>
            </div>
            <div>
                <label for="nome">Nome:</label>
                <input type="text" v-model="aprendiz.nome" id="nome" required>
                <span v-if="errors.nome" class="error">{{ errors.nome }}</span>
            </div>
            <div>
                <label for="turma">Turma:</label>
                <input type="number" v-model="aprendiz.turma" id="turma">
            </div>
            <div>
                <label for="endereco">Endereço:</label>
                <input type="text" v-model="aprendiz.endereco" id="endereco">
            </div>
            <div>
                <label for="complemento">Complemento:</label>
                <input type="text" v-model="aprendiz.complemento" id="complemento">
            </div>
            <div>
                <label for="bairro">Bairro:</label>
                <input type="text" v-model="aprendiz.bairro" id="bairro">
            </div>
            <div>
                <label for="cidade">Cidade:</label>
                <input type="text" v-model="aprendiz.cidade" id="cidade">
            </div>
            <div>
                <label for="estado">Estado:</label>
                <input type="text" v-model="aprendiz.estado" id="estado">
            </div>
            <div>
                <label for="cep">CEP:</label>
                <input type="text" v-model="aprendiz.cep" id="cep">
            </div>
            <div>
                <label for="telefone1">Telefone 1:</label>
                <input type="text" v-model="aprendiz.telefone1" id="telefone1">
            </div>
            <div>
                <label for="telefone2">Telefone 2:</label>
                <input type="text" v-model="aprendiz.telefone2" id="telefone2">
            </div>
            <div>
                <label for="contato">Contato:</label>
                <input type="text" v-model="aprendiz.contato" id="contato">
            </div>
            <div>
                <label for="codigoPagamento">Código de Pagamento:</label>
                <input type="text" v-model="aprendiz.codigoPagamento" id="codigoPagamento">
            </div>
            <div>
                <label for="identificacao">Identificação:</label>
                <input type="text" v-model="aprendiz.identificacao" id="identificacao">
            </div>
            <div>
                <label for="dataInicio">Data de Início:</label>
                <input type="date" v-model="aprendiz.dataInicio" id="dataInicio">
            </div>
            <div>
                <label for="dataRegistro">Data de Registro:</label>
                <input type="date" v-model="aprendiz.dataRegistro" id="dataRegistro">
            </div>
            <div>
                <label for="dataTermino">Data de Término:</label>
                <input type="date" v-model="aprendiz.dataTermino" id="dataTermino">
            </div>
            <div>
                <label for="dataNascimento">Data de Nascimento:</label>
                <input type="date" v-model="aprendiz.dataNascimento" id="dataNascimento">
            </div>
            <div>
                <label for="observacao1">Observação 1:</label>
                <input type="text" v-model="aprendiz.observacao1" id="observacao1">
            </div>
            <div>
                <label for="observacao2">Observação 2:</label>
                <input type="text" v-model="aprendiz.observacao2" id="observacao2">
            </div>
            <div>
                <label for="observacao3">Observação 3:</label>
                <input type="text" v-model="aprendiz.observacao3" id="observacao3">
            </div>
            <div>
                <label for="nomeMae">Nome da Mãe:</label>
                <input type="text" v-model="aprendiz.nomeMae" id="nomeMae">
            </div>
            <div>
                <label for="cpf">CPF:</label>
                <input type="text" v-model="aprendiz.cpf" id="cpf">
            </div>
            <div>
                <label for="numeroCTPS">Número da CTPS:</label>
                <input type="text" v-model="aprendiz.numeroCTPS" id="numeroCTPS">
            </div>
            <div>
                <label for="serieCTPS">Série da CTPS:</label>
                <input type="text" v-model="aprendiz.serieCTPS" id="serieCTPS">
            </div>
            <div>
                <label for="direta">Direta:</label>
                <input type="checkbox" v-model="aprendiz.direta" id="direta">
            </div>
            <div>
                <label for="valorBolsaAuxilio">Valor da Bolsa Auxílio:</label>
                <input type="number" v-model="aprendiz.valorBolsaAuxilio" id="valorBolsaAuxilio">
            </div>
            <div>
                <label for="tipoContrato">Tipo de Contrato:</label>
                <input type="text" v-model="aprendiz.tipoContrato" id="tipoContrato">
            </div>
            <div>
                <label for="prontuario">Prontuário:</label>
                <input type="text" v-model="aprendiz.prontuario" id="prontuario">
            </div>
            <button type="submit">Salvar</button>
        </form>
    </div>
</template>

<script>
import AprendizService from '@/services/aprendiz';

export default {
    data() {
        return {
            aprendiz: {
                matricula: 0,
                turma: 0,
                nome: '',
                endereco: '',
                complemento: '',
                bairro: '',
                cidade: '',
                estado: '',
                cep: '',
                telefone1: '',
                telefone2: '',
                contato: '',
                codigoPagamento: '',
                identificacao: '',
                dataInicio: null,
                dataRegistro: null,
                dataTermino: null,
                dataNascimento: null,
                observacao1: '',
                observacao2: '',
                observacao3: '',
                nomeMae: '',
                cpf: '',
                numeroCTPS: '',
                serieCTPS: '',
                direta: true,
                valorBolsaAuxilio: 0,
                tipoContrato: '',
                prontuario: ''
            },
            id: null,
            errors: {}
        };
    },
    created() {
        this.id = this.$route.params.id;
        if (this.id) {
            this.obterAprendiz(this.id);
        }
    },
    methods: {
        async obterAprendiz(id) {
            try {
                const response = await AprendizService.obter(id);
                this.aprendiz = response.data;
            } catch (error) {
                console.error('Erro ao obter aprendiz:', error);
            }
        },
        async salvar() {
            if (!this.validarFormulario()) {
                return;
            }
            this.prepararDatas();
            try {
                if (this.id) {
                    await AprendizService.gravar({ ...this.aprendiz, id: this.id });
                } else {
                    await AprendizService.gravar(this.aprendiz);
                }
                this.$router.push('/aprendizes'); // Navegar de volta para a lista de aprendizes após salvar
            } catch (error) {
                console.error('Erro ao salvar aprendiz:', error);
            }
        },
        prepararDatas() {
            const camposData = [
                'dataInicio',
                'dataRegistro',
                'dataTermino',
                'dataNascimento'
            ];

            camposData.forEach(campo => {
                if (!this.aprendiz[campo]) {
                    this.aprendiz[campo] = null;
                }
            });
        },
        validarFormulario() {
            this.errors = {};
            if (!this.aprendiz.matricula) {
                this.errors.matricula = 'Matrícula é obrigatória';
            }
            if (!this.aprendiz.nome) {
                this.errors.nome = 'Nome é obrigatório';
            }
            return Object.keys(this.errors).length === 0;
        },
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
    width: 150px;
    margin-right: 10px;
    text-align: right;
}

.form-container input[type="text"],
.form-container input[type="number"],
.form-container input[type="date"],
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

.error {
    color: red;
    margin-left: 160px;
    /* Espaço para alinhar com o input */
}
</style>