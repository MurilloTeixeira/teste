<template>
  <div class="hello">
    <h1>{{ msg }} </h1>
    CEP:<input type="text" :value=cep @keyup="buscaEndereco">
    {{ cep }}
        {{ endereco }}
      
        {{ aprendizes }}
      
    
    <button @click="listAprendizes" >Listar</button>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      cep:"09090050",
      endereco:{},
      aprendizes: []
    }
  },

  methods: {
    listAprendizes(){
    
      for (var i = 1 ; i<100 ;i++) {
        console.log(i)
        this.aprendizes[i]= `Aprendiz ${i}  `

      }
      

    },
    buscaEndereco() {
      
      axios.get(`https://opencep.com/v1/${this.cep}`).then(
        resposta => {
          this.endereco = resposta
        }
      )
      

    }


  }
}


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
