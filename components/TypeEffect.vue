<template>
    <div class="typing-effect">
      <h1 class="typed-text">{{ typedText }}</h1>
    </div>
  </template>
  
  <script>
  export default {
    name: 'TypingEffect',
    props: {
      text: {
        type: String,
        required: true
      },
      typingSpeed: {
        type: Number,
        default: 100 // Velocidade da digitação (em milissegundos)
      },
      eraseSpeed: {
        type: Number,
        default: 50 // Velocidade de apagar (em milissegundos)
      },
      pauseAfterTyping: {
        type: Number,
        default: 2000 // Pausa após digitar (em milissegundos)
      },
      pauseAfterErasing: {
        type: Number,
        default: 1000 // Pausa após apagar (em milissegundos)
      }
    },
    data() {
      return {
        typedText: "", // Texto sendo digitado
        isTyping: true // Controla se está digitando ou apagando
      };
    },
    mounted() {
      this.startTyping();
    },
    methods: {
      startTyping() {
        let currentIndex = 0;
  
        const type = () => {
          if (this.isTyping) {
            // Digita uma letra por vez
            if (currentIndex < this.text.length) {
              this.typedText += this.text[currentIndex];
              currentIndex++;
              setTimeout(type, this.typingSpeed);
            } else {
              // Após digitar, espera e começa a apagar
              this.isTyping = false;
              //setTimeout(type, this.pauseAfterTyping);
            }
          } else {
            // Apaga uma letra por vez
            if (this.typedText.length > 0) {
              this.typedText = this.typedText.slice(0, -1);
              setTimeout(type, this.eraseSpeed);
            } else {
              // Após apagar, espera e começa a digitar novamente
              this.isTyping = true;
              currentIndex = 0;
              setTimeout(type, this.pauseAfterErasing);
            }
          }
        };
  
        // Inicia o efeito
        type();
      }
    }
  };
  </script>
  
  <style scoped>
  .typing-effect {
    display: inline-block;
  }
  
  .typed-text {
    font-size: 3rem;
    font-weight: bold;
    border-right: 2px solid var(--colorShadeA); /* Cursor piscando */
    white-space: nowrap; /* Impede que o texto quebre em várias linhas */
    overflow: hidden; /* Esconde o texto que ainda não foi digitado */
    margin: 0;
    color: black;
  }
  
  /* Animação do cursor piscando */
  @keyframes blink {
    0%, 100% {
      border-right-color: transparent;
    }
    50% {
      border-right-color: var(--colorShadeA);
    }
  }
  
  .typed-text {
    animation: blink 0.75s step-end infinite;
  }
  </style>