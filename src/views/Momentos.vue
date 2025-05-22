<template>
  <div
    class="container-fluid d-flex flex-column justify-content-center align-items-center"
  >
    <Navbar />
    <ImagePreview v-if="currentPreviewImage" :imageSrc="currentPreviewImage" @close="hideImagePreview"/>
    <div class="timeline bg-purple mt-5 d-flex">
      <h2 class="text-center my-4">Linha do Tempo ({{ totalEvents }})</h2>
      <div
        v-for="(event, index) in visibleEvents"
        :key="index"
        class="timeline-item"
      >
        <div class="timeline-content">
          <div
            class="timeline-img"
            @click="showImagePreview(index, event.image)"
          >
            <img :src="event.image" alt="Evento" class="img-fluid" />
          </div>
          <p>{{ event.description }}</p>
          <h5 class="timeline-date">{{ event.date }}</h5>
        </div>

      </div>
      
    </div>

    <!-- Loading Spinner -->
    <div v-if="loading" class="text-center my-3">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Carregando...</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import Navbar from "../components/Navbar.vue";
import ImagePreview from '../components/ImagePreview.vue';
import { ref, computed, onMounted } from "vue";
import momentos from '@/assets/momentos/momentos.json';

const allEvents = ref(momentos.map(m => ({
  ...m,
  image: new URL(`${m.image}`, import.meta.url).href
})));

const visibleCount = ref(5); // Quantos eventos são visíveis inicialmente
const loading = ref(false);

// Lista de eventos visíveis
const visibleEvents = computed(() =>
  allEvents.value.slice(0, visibleCount.value)
);

// Função para carregar mais eventos ao rolar a página
const loadMoreEvents = () => {
  if (loading.value || visibleCount.value >= allEvents.value.length) return;

  loading.value = true;
  setTimeout(() => {
    visibleCount.value = Math.min(
      visibleCount.value + 5,
      allEvents.value.length
    ); // Mostra no máximo 10
    loading.value = false;
  }, 2000);
};

// Detecta o scroll e carrega mais eventos quando o usuário chega perto do final
const handleScroll = () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 50) {
    loadMoreEvents();
  }
};

const totalEvents = allEvents.value.length;

// Adiciona o evento de scroll quando o componente é montado
onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});
</script>

<script>
export default {
  data() {
    return {
      currentPreviewIndex: null, // Nenhum preview é exibido por padrão
      currentPreviewImage: null,
    };
  },
  methods: {
    showImagePreview(index, image) {
      this.currentPreviewIndex = index; // Atualiza o índice da imagem que foi clicada
      this.currentPreviewImage = image; // Armazena a URL da image;
    },
    hideImagePreview() {
      this.currentPreviewIndex = null; // Remove o preview quando o mouse sair
      this.currentPreviewImage = null;
    }
  }
};
</script>

<style>
body {
  /* Fundo de imagem */
  background-image: url("../assets/kawaii.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
}

.event {
  height: 100vh; /* Ocupa 100% da altura da tela */
  width: 100vw;
  margin: 0;
  font-family: "Comic Sans MS", cursive, sans-serif;

  text-align: center;
}

.timeline {
  display: flex;
  width: 1200px;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.bg-purple{
  background-color: rgb(179, 183, 234, 0.8);
  box-shadow: 0 8px 10px rgba(0, 0, 0, 0.2);
  width: calc(100% - 100px);
  border-radius: 20px;
}

.timeline::before {
  content: "";
  position: absolute;
  width: 4px;
  background-color: #007bff;
  top: 100px;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
}

.timeline-item {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  padding: 20px 40px;
  box-sizing: border-box;
  margin-top: 100px;
}

.timeline-item:nth-child(odd):before {
  content: "";
  position: absolute;
  top: 50px;
  right: 49.58%;
  width: 10px;
  height: 10px;
  background: rgba(233, 33, 99, 1);
  border-radius: 50%;
  box-shadow: 0 0 0 3px rgba(233, 33, 99, 0.2);
}

.timeline-item:nth-child(even):before {
  content: "";
  position: absolute;
  top: 50px;
  left: 49.59%;
  width: 10px;
  height: 10px;
  background: rgba(233, 33, 99, 1);
  border-radius: 50%;
  box-shadow: 0 0 0 3px rgba(233, 33, 99, 0.2);
}

.timeline-item:nth-child(odd) {
  justify-content: flex-end;
  text-align: right;
}

.timeline-content {
  display: flex;
  flex-direction: column;
  max-width: 35%;
  font-size: 1.2rem;
  align-items: center;
  text-align: center;
}

.timeline-content p {
  white-space: pre-line;
}

.timeline-img {
  width: 80px;
  height: 80px;
  overflow: hidden;
  background-color: white;
  border: 3px solid #007bff;
  display: flex;
  justify-content: center;
  align-items: center;
}

.image-preview {
  position: absolute;

  background-color: rgba(0, 0, 0, 0.8); /* Fundo escuro semitransparente */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* Garante que o modal fique acima de outros elementos */
}

.image-preview img {
  width: 100%; /* Tamanho grande da imagem */
  height: 100%;
}

.timeline-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
