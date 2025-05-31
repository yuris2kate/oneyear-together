<template>
  <div
    class="container-fluid d-flex flex-column justify-content-center align-items-center"
  >
    <Navbar />
    <ImagePreview v-if="currentPreviewImage" :imageSrc="currentPreviewImage" @close="hideImagePreview"/>
      <div class="timeline bg-purple mt-5 d-flex">
        <div class="d-flex justify-content-center my-3">
        <button @click="carregarTodas" class="btn btn-primary mx-2">
          Carregar todas!
        </button>
      </div>
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

// Função para ordenação
const parseDate = (dateString) => {
  const [day, month, year] = dateString.split('/');
  return new Date(`${year}-${month}-${day}`);
};

// Ordenar os eventos
allEvents.value = allEvents.value.sort((a, b) => {
  return parseDate(a.date) - parseDate(b.date);
});

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
    ); // Mostra no máximo 5 a mais por vez (ou até o total)
    loading.value = false;
  }, 2000); // Tempo de simulação de carregamento
};

// Função para carregar todas as imagens de uma vez
const carregarTodas = () => {
  if (visibleCount.value >= allEvents.value.length) return; // Se já estiverem todas carregadas, não faz nada

  loading.value = true;
  // Você pode usar um setTimeout pequeno para garantir que o spinner apareça
  // ou fazer a atribuição direta se a quantidade de itens não for tão grande
  // a ponto de travar a UI brevemente.
  setTimeout(() => {
    visibleCount.value = allEvents.value.length; // Define a contagem visível para o total de eventos
    loading.value = false;
  }, 100); // Um pequeno delay para o spinner ser visível, ajuste conforme necessário
};

// Detecta o scroll e carrega mais eventos quando o usuário chega perto do final
const handleScroll = () => {
  // Verifica se o scroll está próximo do final da página E se não está carregando E se ainda há eventos para carregar
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 && // -100px de margem
    !loading.value &&
    visibleCount.value < allEvents.value.length
  ) {
    loadMoreEvents();
  }
};

const totalEvents = computed(() => allEvents.value.length); // Tornando totalEvents computado para reatividade se necessário

// Adiciona o evento de scroll quando o componente é montado
onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  // Opcional: Remover o listener ao desmontar para evitar memory leaks
  // return () => window.removeEventListener("scroll", handleScroll);
});
</script>

<script>
export default {
  // O restante do seu script (Options API para ImagePreview) permanece o mesmo
  data() {
    return {
      currentPreviewIndex: null,
      currentPreviewImage: null,
    };
  },
  methods: {
    showImagePreview(index, image) {
      this.currentPreviewIndex = index;
      this.currentPreviewImage = image;
    },
    hideImagePreview() {
      this.currentPreviewIndex = null;
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
  background-color: rgb(179, 183, 234, 0.95);
  box-shadow: 0 8px 10px rgba(0, 0, 0, 0.2);
  width: calc(100% - 100px);
  border-radius: 20px;
}

.timeline::before {
  content: "";
  position: absolute;
  width: 4px;
  background-color: #007bff;
  top: 100px; /* Ajustado para começar abaixo do título e botão */
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: -1; /* Para garantir que fique atrás dos itens */
}

.timeline-item {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  padding: 20px 40px;
  box-sizing: border-box;
  margin-top: 20px; /* Reduzido o margin-top para um espaçamento mais coeso */
}

/* Ajuste para o primeiro timeline-item não ter um margin-top excessivo se o ::before da timeline começa em 100px */
.timeline-item:first-of-type {
  margin-top: 0; /* Ou ajuste conforme a posição do ::before da timeline */
}


.timeline-item:nth-child(odd):before {
  content: "";
  position: absolute;
  top: 50%; /* Centralizar o ponto na altura do item */
  transform: translateY(-50%);
  right: calc(50% - 7px); /* Ajuste para centralizar o ponto na linha */
  width: 14px; /* Aumentado para melhor visualização */
  height: 14px;
  background: rgba(233, 33, 99, 1);
  border-radius: 50%;
  border: 2px solid white; /* Adiciona uma borda branca para destacar */
  box-shadow: 0 0 0 3px rgba(233, 33, 99, 0.2);
  z-index: 1;
}

.timeline-item:nth-child(even):before {
  content: "";
  position: absolute;
  top: 50%; /* Centralizar o ponto na altura do item */
  transform: translateY(-50%);
  left: calc(50% - 7px); /* Ajuste para centralizar o ponto na linha */
  width: 14px; /* Aumentado para melhor visualização */
  height: 14px;
  background: rgba(233, 33, 99, 1);
  border-radius: 50%;
  border: 2px solid white; /* Adiciona uma borda branca para destacar */
  box-shadow: 0 0 0 3px rgba(233, 33, 99, 0.2);
  z-index: 1;
}

.timeline-item:nth-child(odd) {
  padding-left: calc(50% + 30px); /* Ajusta o padding para o conteúdo não sobrepor a linha */
  justify-content: flex-start; /* Alinha o conteúdo à esquerda da linha para itens ímpares */
  text-align: left;
}

.timeline-item:nth-child(even) {
  padding-right: calc(50% + 30px); /* Ajusta o padding para o conteúdo não sobrepor a linha */
  flex-direction: row-reverse; /* Inverte a ordem para imagem vir depois do texto */
  justify-content: flex-start; /* Alinha o conteúdo à direita da linha para itens pares */
  text-align: left; /* Texto alinhado à esquerda para leitura mais natural */
}

.timeline-content {
  display: flex;
  flex-direction: column;
  max-width: calc(80% - 70px); /* Ajuste para não exceder a largura e dar espaço para a linha e ponto */
  font-size: 1.2rem;
  justify-content: center;
  align-items: center; /* Removido para permitir alinhamento específico por odd/even */
  text-align: center; /* Removido para permitir alinhamento específico por odd/even */
  background: rgba(255, 255, 255, 0.7); /* Fundo levemente transparente para o conteúdo */
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

/* Garante que a imagem esteja do lado correto para itens pares quando flex-direction: row-reverse é usado */
.timeline-item:nth-child(even) .timeline-content {
  order: 1; /* Faz o conteúdo vir primeiro */
}
.timeline-item:nth-child(even) .timeline-img-container { /* Crie um container se necessário ou aplique ao .timeline-img */
  order: 2; /* Faz a imagem vir depois */
  margin-left: 20px; /* Espaço entre o conteúdo e a imagem */
  margin-right: 0;
}

.timeline-item:nth-child(odd) .timeline-img-container {
 margin-right: 20px;
 margin-left: 0;
}


.timeline-content p {
  white-space: pre-line;
  margin-bottom: 0.5rem; /* Espaçamento entre descrição e data */
}

.timeline-img {
  width: 80px;
  height: 80px;
  cursor: pointer;
  overflow: hidden;
  background-color: white;
  border: 3px solid #007bff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%; /* Deixa a imagem redonda */
  flex-shrink: 0; /* Impede que a imagem encolha */
  /* Adiciona margem para separar da linha do tempo central */
  /* margin: 0 20px; */ /* Removido para controle mais fino em odd/even */
}


.image-preview {
  position: fixed; /* Alterado para fixed para cobrir a tela inteira */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8); /* Fundo escuro semitransparente */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* Garante que o modal fique acima de outros elementos */
}

.image-preview img {
  max-width: 90%; /* Imagem ocupa no máximo 90% da largura */
  max-height: 90%; /* Imagem ocupa no máximo 90% da altura */
  object-fit: contain; /* Garante que a imagem inteira seja visível */
}

.timeline-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>