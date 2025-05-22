<template>
    <div v-if="showWarning" class="warning-screen d-flex flex-column align-items-center" @click="skipWarning">
      <img src="../assets/aviso.png" alt="aviso" class="warning">
      <p :class="{ 'fade-in': fadeIn, 'fade-out': fadeOut }">
        Aviso: O desenvolvedor deste site ainda está aprimorando suas habilidades de design, então, caso algum componente esteja torto ou a paleta de cores não combine, ele pede desculpas!
      </p>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        showWarning: false,
        fadeIn: false,
        fadeOut: false,
        timeoutId: null,
      };
    },
    mounted() {
      if (!localStorage.getItem("screenWarning")) {
        this.showWarning = true;
        
        // Pequeno delay para ativar o fade-in corretamente
        setTimeout(() => {
            this.fadeIn = true;
        }, 50);
  
        // Tempo para ler o aviso (6s)
        setTimeout(() => {
          this.fadeOut = true;
        }, 9000);
  
        // Tempo total antes do redirecionamento (9s)
        this.timeoutId = setTimeout(this.skipWarning, 11500);
      } else {
        this.$router.push("/home");
      }
    },
    methods: {
      skipWarning() {
        if (this.showWarning) {
          this.showWarning = false;
          localStorage.setItem("seenWarning", "true");
          this.$router.push("/home");
          clearTimeout(this.timeoutId); // Cancela o timeout para evitar redirecionamento duplo
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .warning-screen {
    position: fixed;
    inset: 0;
    background-color: black;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    cursor: pointer;
  }
  
  p {
    color: white;
    font-size: 1.5rem;
    font-family: 'Arial', sans-serif;
    max-width: 80%;
    opacity: 0;
    transition: opacity 1s ease-in-out;
  }
  
  .fade-in {
    opacity: 1;
  }
  
  .fade-out {
    opacity: 0;
  }

  .warning{
    width: 50vw;  /* Ocupa 50% da largura da tela */
    height: 50vw; /* Mantém a proporção */
    max-width: 312px;
    max-height: 312px;
  }

</style>
  