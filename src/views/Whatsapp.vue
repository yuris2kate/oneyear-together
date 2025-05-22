<script setup>
import Navbar from "@/components/Navbar.vue";
import Modal from "@/components/Modal.vue";
import UploadTexto from "../components/UploadTexto.vue";
</script>

<template>
  <div
    class="container-fluid d-flex flex-column justify-content-center align-items-center"
  >
    <Navbar />
    <div class="bg-purple my-5 d-flex flex-column align-items-center">
      <Modal
        class="mt-5"
        titulo="Tutorial do Sistema"
        :passos="passosInstrucoes"
        @concluido="handleConclusao"
        ref="modalInstrucoes"
      />
      <UploadTexto class="mt-5" />
    </div>
  </div>
</template>

<script>
import ConquistaGrafico from "../components/ConquistaGrafico.vue";

export default {
  components: { UploadTexto },
  name: "AnniversaryPage",
  data() {
    return {
      conquistas: {
        quemMandaMaisAudios: { nome: "João", quantidade: 42 },
        textosMaisLongos: { nome: "Maria", mediaCaracteres: 128 },
        maisMensagens: { nome: "João", quantidade: 1200 },
        maiorSequencia: { nome: "Maria", quantidade: 15 },
        maiorVacuo: { nome: "João", tempoHoras: 72 },
        emojiFavorito: { nome: "Maria", emoji: "😂", quantidade: 45 },
        maisElogios: { nome: "João", quantidade: 23 },
        madrugador: { nome: "Maria", quantidade: 18 },
        maisEuTeAmo: { nome: "João", quantidade: 12 },
        maisTambemTeAmo: { nome: "Maria", quantidade: 10 },
      },
    };
  },
  methods: {},
};
</script>

<style>
body {
  font-family: "Comic Sans MS", cursive, sans-serif;
  /* Fundo de imagem */
  background-image: url("../assets/kawaii.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
}
</style>

<style scoped>
.menu {
  display: flex;
  justify-content: space-around;
  margin: 20px;
}

.menu a {
  text-decoration: none;
  color: #ff5722;
  font-size: 20px;
}

.content {
  margin: 20px;
}

img {
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.bg-purple{
  background-color: rgb(179, 183, 234, 0.95);
  box-shadow: 0 8px 10px rgba(0, 0, 0, 0.2);
  width: calc(100% - 100px);
  border-radius: 20px;
}

</style>
