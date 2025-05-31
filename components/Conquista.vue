<template>
    <div class="achievement-container">
      <button @click="triggerAchievement">Ver conquista</button>
      
      <transition-group name="achievement" tag="div">
        <div 
          v-for="(achievement, index) in activeAchievements" 
          :key="index"
          class="achievement-box"
          @click="removeAchievement(index)"
        >
          <div class="achievement-icon">
            <img src="https://minecraft.wiki/images/Diamond_Sword_JE3_BE3.png" alt="Ícone de conquista">
          </div>
          <div class="achievement-text">
            <div class="achievement-title">Conquista desbloqueada!</div>
            <div class="achievement-description">{{ achievement.text }}</div>
          </div>
        </div>
      </transition-group>
    </div>
  </template>
  
  <script>

  export default {
    name: 'MinecraftAchievement',
    data() {
      return {
        activeAchievements: [],
        achievements: [
          { text: "Hora de minerar! - Cave sua primeira pedra" },
          { text: "Forno de fundição - Construa um forno" },
          { text: "Tempo de colheita - Plante e colha trigo" },
          { text: "Pesquei! - Pescou um peixe" },
          { text: "Em chamas! - Pegue fogo" },
          { text: "Ao infinito e além! - Voe com foguetes" },
          { text: "Lobisomem? - Mate um lobo" },
          { text: "Arqueiro - Atire em algo com uma flecha" }
        ]
      }
    },
    methods: {
      triggerAchievement() {
        // Seleciona uma conquista aleatória
        const randomIndex = Math.floor(Math.random() * this.achievements.length);
        const newAchievement = {
          text: this.achievements[randomIndex].text,
          id: Date.now() // Usamos timestamp como ID único
        };
        
        this.activeAchievements.push(newAchievement);
        
        // Remove a conquista após 5 segundos
        setTimeout(() => {
          const index = this.activeAchievements.findIndex(a => a.id === newAchievement.id);
          if (index !== -1) {
            this.activeAchievements.splice(index, 1);
          }
        }, 5000);
      },
      removeAchievement(index) {
        this.activeAchievements.splice(index, 1);
      }
    }
  }
  </script>
  
  <style scoped>

@font-face {
  font-family: 'Minecraft';
  src: url('../assets/fonts/MinecraftRegular.otf') format('truetype');
  font-weight: normal;
  font-style: normal;
}

  .achievement-container {
    position: relative;
    padding: 20px;
  }
  
  button {
    padding: 10px 15px;
    background: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    transition: background 0.3s;
  }
  
  button:hover {
    background: #45a049;
  }
  
  .achievement-box {
    position: fixed;
    top: 20px;
    right: 20px;
    background: #212121;
    border: 4px solid #525252;
    border-radius: 8px;
    padding: 10px;
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    color: white;
    font-family: 'Minecraft', Arial, sans-serif;
    max-width: 300px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    transform: translateX(0);
    transition: all 0.5s;
  }
  
  .achievement-icon {
    margin-right: 10px;
  }
  
  .achievement-icon img {
    width: 40px;
    height: 40px;
  }
  
  .achievement-title {
    font-weight: bold;
    color: #FFFD09;
    margin-bottom: 0px;
  }
  
  .achievement-description {
    font-size: 14px;
    color: #C4C4C4;
  }
  
  /* Animações */
  .achievement-enter-active, .achievement-leave-active {
    transition: all 0.5s;
  }
  
  .achievement-enter, .achievement-leave-to {
    opacity: 0;
    transform: translateX(100px);
  }
  
  .achievement-move {
    transition: transform 0.5s;
  }
  </style>