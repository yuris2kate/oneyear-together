<template>
    <div class="card">
      <div class="sparkle">✨</div>
      <div class="ribbon" :class="raridadeClass">{{ raridadeCapitalizada }}</div>
      <div class="title">{{ titulo }}</div>
      <div class="subtitle">{{ subtitulo }}</div>
      <div class="description">{{ descricao }}</div>
      <div class="person">— {{ pessoa }} {{ (pessoa === "Sloth")? "👨‍🦱":"👩‍🦱" }}</div>
    </div>
  </template>
  
  <script>
  export default {
    name: "ConquistaCard",
    props: {
      titulo: String,
      subtitulo: String,
      descricao: String,
      pessoa: String,
      raridade: {
        type: String,
        default: "comum"
      }
    },
    computed: {
      raridadeClass() {
        return this.raridade.toLowerCase();
      },
      raridadeCapitalizada() {
        return this.raridade.charAt(0).toUpperCase() + this.raridade.slice(1);
      }
    }
  };
  </script>
  
  <style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Comic+Neue:wght@700&family=Quicksand:wght@500&display=swap');
  
  .card {
    background: #fff9fc;
    border-radius: 18px;
    box-shadow: 0 8px 24px rgba(198, 117, 205, 0.3);
    border-left: 6px solid #e48ed1;
    padding: 24px 28px;
    width: 480px;
    max-width: 90%;
    position: relative;
    overflow: visible;
    transition: transform 0.25s ease-in-out;
    font-family: 'Quicksand', sans-serif;
    margin-bottom: 25px;
  }
  
  .card:hover {
    transform: scale(1.02);
  }
  
  .sparkle {
    position: absolute;
    top: -8px;
    right: -8px;
    font-size: 1.6rem;
    color: #ffd9fa;
    animation: sparkle 1.6s infinite ease-in-out alternate;
  }
  
  @keyframes sparkle {
    0% { transform: scale(1) rotate(0deg); opacity: 0.8; }
    100% { transform: scale(1.2) rotate(20deg); opacity: 1; }
  }
  
  .title {
    font-family: 'Comic Neue', cursive;
    font-size: 1.6rem;
    color: #d15bb4;
    margin-bottom: 6px;
  }
  
  .subtitle {
    font-size: 1.05rem;
    color: #a14cc2;
    font-weight: 600;
    margin-bottom: 12px;
  }
  
  .description {
    font-size: 0.96rem;
    color: #5e3b66;
    line-height: 1.5;
    margin-bottom: 18px;
  }

  .person {
    text-align: right;
    font-size: 0.9rem;
    font-style: italic;
    color: #a77fc4;
  }
  
  .ribbon {
    position: absolute;
    top: 0;
    left: 0;
    font-size: 0.75rem;
    font-weight: bold;
    padding: 4px 12px;
    border-bottom-right-radius: 12px;
    border-top-left-radius: 8px;
    color: white;
  }
  
  /* Raridade Cores */
  .comum { background: #9CA3AF; }
  .incomum { background: #facc15; color: #4c4c4c; }
  .raro { background: #3b82f6; }
  .epico { background: #8b5cf6; }
  .sinistro { background: #e11d48; }
  </style>
  