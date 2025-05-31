<template>
    <div class="question-box">
      <p>{{ question }}</p>
      <div class="buttons">
        <button @click="$emit('accept')" class="accept">Aceito</button>
        <button @click="$emit('reject')" class="reject">Recuso</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      question: {
        type: String,
        required: true
      }
    }
  };
  </script>
  
  <style scoped>
  .question-box {
    text-align: center;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background: #f9f9f9;
    width: 250px;
    margin: auto;
  }
  .buttons {
    display: flex;
    justify-content: space-around;
    margin-top: 10px;
  }
  button {
    padding: 8px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  .accept {
    background: green;
    color: white;
  }
  .reject {
    background: red;
    color: white;
  }
  </style>