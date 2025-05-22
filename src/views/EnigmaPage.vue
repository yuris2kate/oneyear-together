<template>
  <div
    class="container-fluid d-flex flex-column justify-content-center align-items-center"
  >
    <Navbar />
    <div class="bg-purple my-5 d-flex flex-column align-items-center">
      <h1 class="mt-5">Desafio do Nosso 1 Ano 💖</h1>
      <p class="mb-5">
        Encontre os 4 números escondidos pelo site e insira abaixo:
      </p>

      <div class="input-grid w-50">
        <input
          v-for="(num, index) in numbers"
          :key="index"
          v-model="numbers[index]"
          @input="(e) => validateInput(index, e)"
          @keydown.delete="handleBackspace(index)"
          @paste.prevent
          class="number-input"
          type="text"
          maxlength="1"
          placeholder="?"
        />
      </div>

      <button class="check-button" @click="checkCombination">Verificar</button>

      <div class="message" :class="{ success: isSuccess, error: isError }">
        {{ message }}
      </div>
    </div>
  </div>
</template>

<script setup>
import Navbar from "../components/Navbar.vue";
import { ref } from "vue";

const numbers = ref(["", "", "", ""]);
const correctCombination = ref(["1", "2", "3", "4"]);
const message = ref("");
const isSuccess = ref(false);
const isError = ref(false);

const validateInput = (index, event) => {
  // Mantenha a validação existente
  numbers.value[index] = event.target.value.replace(/\D/g, "");
  
  // Foco automático para frente
  if (numbers.value[index] !== "" && index < 3) {
    const inputs = document.querySelectorAll(".number-input");
    inputs[index + 1].focus();
  }
};

const handleBackspace = (index) => {
  if (numbers.value[index] === "" && index > 0) {
    const inputs = document.querySelectorAll(".number-input");
    inputs[index - 1].focus();
  }
};

const checkCombination = () => {
  if (numbers.value.some((num) => num === "")) {
    showMessage("Preencha todos os números!", "error");
    return;
  }

  const isCorrect = numbers.value.every(
    (num, index) => num === correctCombination.value[index]
  );

  if (isCorrect) {
    showMessage(
      "Parabéns! Você desbloqueou nosso prêmio especial! 💝",
      "success"
    );
  } else {
    showMessage("Combinação incorreta. Continue procurando!", "error");
  }
};

const showMessage = (msg, type) => {
  message.value = msg;
  isSuccess.value = type === "success";
  isError.value = type === "error";

  if (type === "error") {
    setTimeout(() => {
      message.value = "";
      isError.value = false;
    }, 2000);
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
</style>

<style scoped>
body {
  font-family: "Arial", sans-serif;
  background-color: #ffebee;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin: 0;
  padding: 20px;
}
.container {
  background-color: white;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  padding: 30px;
  max-width: 500px;
  width: 100%;
  text-align: center;
}
h1 {
  color: #d81b60;
  margin-bottom: 20px;
}
.input-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
  margin: 25px 0;
}
.number-input {
  width: 100%;
  height: 60px;
  text-align: center;
  font-size: 24px;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  outline: none;
  transition: border-color 0.3s;
}
.number-input:focus {
  border-color: #d81b60;
}
.check-button {
  background-color: #d81b60;
  color: white;
  border: none;
  padding: 12px 30px;
  font-size: 18px;
  border-radius: 30px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 15px;
}
.check-button:hover {
  background-color: #c2185b;
}
.message {
  margin-top: 20px;
  font-size: 18px;
  min-height: 27px;
}
.success {
  color: #388e3c;
  font-weight: bold;
  animation: fadeIn 0.5s;
}
.error {
  color: #d32f2f;
  animation: shake 0.5s;
}
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }
  20%,
  60% {
    transform: translateX(-5px);
  }
  40%,
  80% {
    transform: translateX(5px);
  }
}

.bg-purple {
  background-color: rgba(179, 183, 234, 0.9);
  box-shadow: 0 8px 10px rgba(0, 0, 0, 0.2);
  width: calc(100% - 100px);
  border-radius: 20px;
}
</style>
