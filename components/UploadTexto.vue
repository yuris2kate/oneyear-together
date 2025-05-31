<script setup>
import BarChart from "../components/BarCharts.vue";
import ConquistaGrafico from "../components/ConquistaGrafico.vue";
import WordCloud from "../components/NuvemPalavras.vue";
import axios from "axios";
</script>

<template>
  <div class="d-flex flex-column align-items-center">
    <div
      class="upload-container d-flex"
      @dragover="handleDragOver"
      @drop="handleDrop"
      @click="triggerFileInput"
    >
      <div class="upload-box d-flex flex-column">
        <p class="upload-instructions">
          Clique para fazer upload ou arraste e solte<br />
          <span class="file-types">TXT (máx. 25MB)</span>
        </p>
        <input
          id="file-upload"
          type="file"
          accept=".txt"
          @change="handleFileUpload"
          class="upload-input"
        />
        <p v-if="fileName" class="file-name">
          Arquivo selecionado: {{ fileName }}
        </p>
        <p v-if="error" class="error-message">{{ error }}</p>
        <div v-if="isLoading" class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Carregando...</span>
        </div>
      </div>
    </div>

    <BarChart :chartData="charCountByDay" />
    <WordCloud :words="myWords" :width="1000" :height="500" />
    <ConquistaGrafico
      v-for="(conquista, chave) in conquistas"
      :key="chave"
      :titulo="getTitulo(chave)"
      :subtitulo="`Campeão: ${conquista.nome}`"
      :descricao="getDescricao(conquista.quantidade, chave)"
      :pessoa="conquista.nome"
      :raridade="getRaridade(conquista.quantidade)"
    />

    <div v-if="maxTimeDifference" class="mt-3">
      <strong>Maior intervalo entre mensagens:</strong> {{ maxTimeDifference }}
    </div>
  </div>
</template>

<script>
export default {
  components: {
    BarChart,
    ConquistaGrafico,
  },
  data() {
    return {
      myWords: [],
      fileName: "",
      error: "",
      conquistas: {},
      charCountByDay: {
        labels: [
          "Monday",
          "Tuesday",
          "Wednensday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        datasets: [
          {
            label: "Quantidade de Caracteres por Dia",
            data: [0, 0, 0, 0, 0, 0, 0],
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      },
      maxTimeDifference: null,
      isLoading: false,
    };
  },
  methods: {
    triggerFileInput() {
      document.getElementById("file-upload").click();
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      this.processFile(file);
    },
    handleDrop(event) {
      event.preventDefault();
      const file = event.dataTransfer.files[0];
      this.processFile(file);
    },
    handleDragOver(event) {
      event.preventDefault();
    },
    async processFile(file) {
      if (!file) {
        this.error = "Nenhum arquivo selecionado.";
        return;
      }

      if (!file.name.endsWith(".txt")) {
        this.error = "Por favor, selecione um arquivo .txt válido.";
        return;
      }

      const maxSize = 25 * 1024 * 1024;
      if (file.size > maxSize) {
        this.error =
          "O arquivo é muito grande. Tamanho máximo permitido: 25MB.";
        return;
      }

      this.error = "";
      this.fileName = file.name;
      this.isLoading = true;

      try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await axios.post(
          "http://localhost:8080/api/chat/process",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        const result = response.data;
        this.conquistas = result.conquista || {};
        this.myWords =
          result.nuvemDePalavras?.map((item) => ({
            text: item.text,
            size: +item.size, // Garante número
          })) || [];

        console.log(this.myWords);

        this.charCountByDay = {
          labels: result.daysOfWeek,
          datasets: [
            {
              label: "Quantidade de Caracteres por Dia",
              data: result.charCountByDay,
              backgroundColor: [
                "#A3D8F4", // Azul Bebê
                "#FADADD", // Rosa Claro
                "#E6E6FA", // Lavanda
                "#C1E1C1", // Verde Menta
                "#FFDAB9", // Pêssego Claro
                "#FFFACD", // Amarelo Melão
                "#D8B7DD", // Lilás Pastel
              ],
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        };

        this.maxTimeDifference = result.maxTimeDifference;
      } catch (err) {
        this.error = "Erro ao processar o arquivo. Tente novamente.";
        console.error(err);
      } finally {
        this.isLoading = false;
      }
    },
    showMessages() {
      console.log(this.charCountByDay);
    },
    getDescricao(conquista, chave) {
      switch (chave) {
        case "maisEuTeAmo":
          return `Falou 'Eu te amo' mais de ${conquista} vezes e derreteu um coração como um forno de afeto!"💘`;
        case "maisEuTambemTeAmo":
          return `Respondeu 'Eu te amo também' mais de ${conquista} vezes e provou que o amor é um jogo de ida e volta! 💞`;
        case "mensagemComMaisCarectere":
          return `Escreva uma mensagem com mais de ${conquista} caracteres e deixe até Shakespeare com inveja da sua prosa! 📜`;
        case "maisMidiaOculta":
          return `Mandou ${conquista} mídias ocultas... O FBI tá de olho, mas a curiosidade é maior! 🔒📷`;

        case "maisMandouMensagem":
          return `Digitou ${conquista} mensagens... praticamente um(a) funcionário(a) do WhatsApp! 🧑‍💻📱`;

        case "maiorSequenciaMensagens":
          return `Mandou ${conquista} mensagens seguidas sem deixar ninguém responder... É o rei/rainha do monólogo! 🎤👑`;

        case "maisMensagensMadrugada":
          return `Disparou ${conquista} mensagens na madruga. Dormir pra quê, né? 🌚💬`;

        case "maisBomdia":
          return `Disse 'Bom dia' ${conquista} vezes... Solzinho personalizado todo dia! 🌞📩`;
        default:
          return `Fez algo incrível ${conquista} vezes! 🌟`;
      }
    },
    getTitulo(chave) {
      switch (chave) {
        case "maisEuTeAmo":
          return `Amor Elevado ao Cubo³`;
        case "maisEuTambemTeAmo":
          return `Não Fica sem Resposta!`;
        case "mensagemComMaisCarectere":
          return `Mensagem Tamanho Família.`;
        case "maisMidiaOculta":
          return "Câmera Off, Emoção On 🎥❌";
        case "maisMandouMensagem":
          return "Digitou Até Gastar o Teclado ⌨️🔥";
        case "maiorSequenciaMensagens":
          return "Modo Monólogo Ativado 🎙️😅";
        case "maisMensagensMadrugada":
          return "Coruja da Madruga 🌙🦉";
        case "maisBomdia":
          return "CEO do Bom Dia ☀️📨";
        default:
          return `Fez algo incrível vezes! 🌟`;
      }
    },
    getRaridade(conquista) {
      if (conquista < 100) return "comum";
      if (conquista < 200) return "incomum";
      if (conquista < 500) return "epico";
      if (conquista < 1000) return "raro";
      return "sinistro";
    },
  },
};
</script>

<style scoped>
.upload-container {
  text-align: center;
  margin: 20px;
  border: 2px dashed var(--colorShadeA);
  border-radius: 10px;
  padding: 20px;
  background-color: var(--colorShadeE);
  cursor: pointer;
  transition: background-color 0.3s ease;
  height: 300px;
  width: 300px;
}

.upload-container:hover {
  background-color: var(--colorShadeD);
}

.upload-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.upload-instructions {
  margin: 0;
  color: var(--colorShadeA);
  font-size: 1.1rem;
}

.file-types {
  font-size: 0.9rem;
  color: var(--colorShadeB);
}

.upload-input {
  display: none;
}

.file-name {
  margin-top: 10px;
  color: var(--colorShadeA);
}

.error-message {
  margin-top: 10px;
  color: red;
}
</style>
