<script setup>
import TypeEffect from '../components/TypeEffect.vue';
import Navbar from '../components/Navbar.vue'
</script>

<template>
    <div class="container-fluid d-flex flex-column justify-content-center align-items-center">
      <Navbar />
      <div class="bg-purple my-5">
        <div class="text-container d-flex flex-column align-items-center mx-5">
          <h1 class="text-center">Parabéns</h1>
          <p>Hoje é um dia muito especial 05/06/2024. O dia que oficialmente começamos a namorar! Nesse dia eu estava</p>
          <img src="../assets/ursinhos.gif" alt="kawaii" class="img-kawaii">
        </div>
      </div>
      <div class="sprite"></div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'AnniversaryPage',
    data() {
      return {
        welcomeMessage: "Feliz 1 ano juntinhos, Kate!!!" // Texto que será digitado
      };
    },
  };
  </script>
  
<style>

body{
  /* Fundo de imagem */
  background-image: url('../assets/kawaii.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
}

</style>
<style scoped>

.img-kawaii{
  width: 500px;
  height: 500px;
  border-radius: 50%;
}

.bg-purple{
  background-color: rgba(179, 183, 234, 0.9);
  box-shadow: 0 8px 10px rgba(0, 0, 0, 0.2);
  width: calc(100% - 100px);
  border-radius: 20px;
}

.home{
  margin: 0;
  height: 100vh; /* Ocupa 100% da altura da tela */
  font-family: 'Comic Sans MS', cursive, sans-serif;
  
  text-align: center;
}


</style>