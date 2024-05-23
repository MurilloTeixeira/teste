<template>
  <div>
    <h1>Lista de Aprendizes</h1>
    <table border="1">
      <thead>
        <tr>
          <th>Nome</th>
          <th>Matrícula e</th>
          <th>Turma</th>
          <th>Endereço</th>
          <th>Cidade</th>
          <th>Telefone</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="aprendiz in aprendizes" :key="aprendiz.matricula">
          <td>{{ aprendiz.nome }}</td>
          <td>{{ aprendiz.matricula }}</td>
          <td>{{ aprendiz.turma }}</td>
          <td>{{ aprendiz.endereco }}</td>
          <td>{{ aprendiz.cidade }}</td>
          <td>{{ aprendiz.telefone1 }}</td>
        </tr>
      </tbody>
    </table>


    Nome:<input type="text" v-model="novoAprendiz.nome"> <br>
    Matricula:<input type="text" v-model="novoAprendiz.matricula"> <br>
    <button @click="criarNovo"> Adicionar </button>



  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      aprendizes: [],
      novoAprendiz: {
        nome: '',
        matricula: null,
      }
    };
  },
  created() {
    this.carregaAprendizes();
  },
  methods: {
    async carregaAprendizes() {
      try {
        const response = await axios.get('https://futurocodebackend-ureotn5zxq-uc.a.run.app/aprendiz');
        this.aprendizes = response.data;
      } catch (error) {
        console.error('Erro ao buscar aprendizes:', error);
      }
    },

    criarNovo() {
        axios.post('https://futurocodebackend-ureotn5zxq-uc.a.run.app/aprendiz', this.novoAprendiz)
        .then( (response )=>{
            console.log(response) 
            this.carregaAprendizes();
            this.novoAprendiz.nome = '';
            this.novoAprendiz.matricula = null;



        })
        .catch (error => {
            console.error("Erro ao cadastrar Aprendiz" , error)
        });
    }

  }
};
</script>
