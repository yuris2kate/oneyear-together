<template>
    <div>
      <div class="progress-bar-container">
        <div class="progress-bar" :style="{ width: happiness + '%', backgroundColor: progressColor }"></div>
        <span class="progress-text">{{ happiness }}% {{ happinessEmoji }}</span>
      </div>
  
      <div class="content">
        <button @click="increaseHappiness">Aumentar Felicidade</button>
        <button @click="decreaseHappiness">Diminuir Felicidade</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from "vue";
  
  const happiness = ref(50); // Começa com 50%
  
  const increaseHappiness = () => {
    if (happiness.value < 100) happiness.value += 10;
  };
  
  const decreaseHappiness = () => {
    if (happiness.value > 0) happiness.value -= 10;
  };
  
  // Computed para definir a cor da barra
  const progressColor = computed(() => {
    if (happiness.value <= 25) return "#ff4d4d"; // Vermelho
    if (happiness.value <= 50) return "#ff9900"; // Laranja
    if (happiness.value <= 75) return "#ffcc00"; // Amarelo
    return "#00cc66"; // Verde
  });
  
  // Computed para definir o emoji
  const happinessEmoji = computed(() => {
    if (happiness.value <= 25) return "😢"; // Triste
    if (happiness.value <= 50) return "😐"; // Neutro
    if (happiness.value <= 75) return "😊"; // Feliz
    return "😄"; // Muito feliz
  });
  </script>
  
  <style scoped>
  /* Estilizando a barra de progresso */
  .progress-bar-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 30px;
    background: #222;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: bold;
    z-index: 1000;
  }
  
  /* Barra de progresso */
  .progress-bar {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    transition: width 0.3s ease-in-out, background-color 0.3s ease-in-out;
  }
  
  /* Texto centralizado */
  .progress-text {
    position: relative;
    z-index: 2;
  }
  
  /* Conteúdo abaixo da barra */
  .content {
    margin-top: 50px;
    padding: 20px;
  }
  button {
    margin: 10px;
    padding: 10px;
    font-size: 16px;
  }
  </style>
  