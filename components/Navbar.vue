<template>
    <nav class="navbar">
      <div class="menu mt-3">
        <Button class="me-3" buttonText="Home" buttonLink="/home" :buttonImage="homeImage" />
        <Button class="me-3" buttonText="Momentos" buttonLink="/momentos" :buttonImage="graphImage" />
        <Button class="me-3" buttonText="Whatsapp" buttonLink="/whatsapp" :buttonImage="contactImage" />
        <Button buttonText="Futuro" button-link="/enigma" :buttonImage="futureImage"/>
      </div>
    </nav>
  </template>
  
  <script setup>
  import homeImage from '../assets/house.png';
  import graphImage from '../assets/graph.png';
  import contactImage from '../assets/contact.png';
  import futureImage from '../assets/friends.png'

  import Button from './Button.vue'; // Ajuste o caminho conforme necessário
  </script>
  
  <style scoped>
  
  .menu {
    display: flex;
    width: 1200px;
    justify-content: center;
  }
  
  /* Estilos para os botões (opcional, caso queira personalizar) */
  .menu .button {
    padding: 10px 20px;
    font-size: 1rem;
    border-radius: 25px;
    transition: background-color 0.3s ease;
  }
  
  .menu .button:hover {
    background-color: var(--colorShadeD); /* Cor ao passar o mouse */
  }
  </style>