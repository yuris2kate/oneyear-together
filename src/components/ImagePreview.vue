<template>
    <div class="overlay" @click="closeImage">
      <img :src="imageSrc" alt="Imagem Centralizada" />
    </div>
  </template>
  
  <script>
  export default {
    props: {
      imageSrc: {
        type: String,
        required: true,
      },
    },
    methods: {
      closeImage(event) {
        // Evita que o clique na imagem feche a imagem
        if (event.target === event.currentTarget) {
          this.$emit('close');
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .overlay {
    position: fixed; /* Fixa a div em relação à tela */
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center; /* Centraliza horizontalmente */
    align-items: center; /* Centraliza verticalmente */
    background: rgba(0, 0, 0, 0.5); /* Fundo semitransparente */
    z-index: 9999; /* Fica à frente de outros elementos */
  }
  
  .overlay img {
    max-width: 80%; /* Ajuste do tamanho da imagem */
    max-height: 80%; /* Ajuste do tamanho da imagem */
  }
  </style>
  