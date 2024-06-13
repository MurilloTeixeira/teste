<template>
  <div class="chat-container">
    <div class="chat-history">
      <div
        v-for="mensagem in mensagens"
        :key="mensagem.id"
        :class="{
          mensagem: true,
          'mensagem-usuario': mensagem.usuario,
          'mensagem-bot': !mensagem.usuario
        }"
      >
        {{ mensagem.texto }}
      </div>
    </div>
    <div class="chat-input">
      <input
        v-model="novaMensagem"
        @keyup.enter="enviarMensagem"
        placeholder="Digite sua mensagem aqui..."
      />
      <button @click="enviarMensagem">Enviar</button>
    </div>
  </div>
</template>

<script>
// Importando o SDK do Google Gemini
import { GoogleGenerativeAI } from '@google/generative-ai';

export default {
  data() {
    return {
      mensagens: [], // Armazena o histórico do chat
      novaMensagem: '', // Armazena a mensagem atual sendo digitada
      genAI: null, // Armazena a instância do GoogleGenerativeAI
      sessaoChat: null, // Armazena a sessão de chat
    };
  },
  async created() {
    // Inicializa o SDK do Google Gemini com sua chave API
    const chaveApi = 'SUA_CHAVE_API_GEMINI_AQUI';
    this.genAI = new GoogleGenerativeAI(chaveApi);

    // Obtém o modelo
    const modelo = this.genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
    });

    // Inicia uma sessão de chat com as configurações iniciais
    this.sessaoChat = modelo.startChat({
      generationConfig: {
        temperature: 1,
        topP: 0.95,
        topK: 64,
        maxOutputTokens: 8192,
        responseMimeType: 'text/plain',
      },
      history: [],
    });
  },
  methods: {
    async enviarMensagem() {
      // Não envia mensagens vazias
      if (this.novaMensagem.trim() === '') return;

      // Adiciona a mensagem do usuário ao histórico do chat
      const mensagemUsuario = {
        id: Date.now(),
        texto: this.novaMensagem,
        usuario: true,
      };
      this.mensagens.push(mensagemUsuario);

      // Limpa o campo de entrada
      this.novaMensagem = '';

      try {
        // Envia a mensagem para a API do bot
        const resultado = await this.sessaoChat.sendMessage(mensagemUsuario.texto);

        // Adiciona a resposta do bot ao histórico do chat
        const mensagemBot = {
          id: Date.now(),
          texto: resultado.response.text(), // Ajusta com base na estrutura real da resposta da API
          usuario: false,
        };
        this.mensagens.push(mensagemBot);
      } catch (erro) {
        console.error('Erro ao comunicar com o bot:', erro);
      }
    },
  },
};
</script>

<style scoped>
.chat-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-width: 600px;
  margin: 0 auto;
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
}

.chat-history {
  flex: 1;
  padding: 10px;
  overflow-y: scroll;
  background-color: #f9f9f9;
}

.mensagem {
  padding: 8px;
  margin: 5px 0;
  border-radius: 4px;
  max-width: 70%;
}

.mensagem-usuario {
  align-self: flex-end;
  background-color: #dcf8c6;
}

.mensagem-bot {
  align-self: flex-start;
  background-color: #ebebeb;
}

.chat-input {
  display: flex;
  padding: 10px;
  background-color: #fff;
  border-top: 1px solid #ccc;
}

.chat-input input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 10px;
}

.chat-input button {
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
}

.chat-input button:hover {
  background-color: #0056b3;
}
</style>
