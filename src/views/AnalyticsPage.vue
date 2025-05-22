<template>
    <div class="analytics-page">

      <Letreiro :items="achievements"/>
      <h1>Análise das Conversas</h1>
  
      <!-- Gráficos -->
      <div class="charts-container">
        <div class="chart-container">
          <h2>Quantidade de Caracteres por Dia da Semana</h2>
          <canvas ref="charsChart"></canvas>
        </div>
      </div>
  
      <!-- Lista de Conquistas -->
      <div class="container py-5">
        <div v-for="(achievement, index) in achievements" :key="index" class="achievement-card mb-3">
          <div class="achievement-title">{{ achievement.title }}</div>
          <div class="achievement-desc">{{ achievement.description }}</div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import Chart from "chart.js/auto";
  import Letreiro from "../components/Letreiro.vue";
  
  // Referência para o gráfico
  const charsChart = ref(null);
  
  // Lista de conquistas
  const achievements = ref([
    { title: "Yuri foi o que mais falou 'Eu te amo'", description: "Total: 45 mil vezes" },
    { title: "Maior tempo sem conversar", description: "45 horas (Kate deixou o Yuri no vácuo)" },
    { title: "Quem mais mandou emoji", description: "Kate, Total: 5 emojis" }
  ]);
  
  // Dados do gráfico
  const renderCharsChart = () => {
    if (!charsChart.value) return; // Evita erros se o canvas ainda não estiver pronto
  
    const ctx = charsChart.value.getContext("2d");
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"], // Dias da semana
        datasets: [
          {
            label: "Caracteres por Dia",
            data: [1200, 1500, 1300, 1700, 1600, 1400, 1100], // Quantidade de caracteres
            backgroundColor: "rgba(255, 99, 132, 1)",
            borderColor: "rgba(147, 112, 219, 1)",
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  };
  
  onMounted(() => {
    renderCharsChart();
  });
  </script>
  
  <style scoped>
  @import url("https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap");
  
  .analytics-page {
    padding: 20px;
    text-align: center;
  }
  
  .charts-container {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-top: 20px;
  }
  
  .chart-container {
    padding: 20px;
    border-radius: 10px;
    width: 600px;
    height: 400px;
    margin-bottom: 150px;
  }
  
  .achievement-card {
    background-color: #1e1e1e;
    color: white;
    border-radius: 8px;
    padding: 15px;
    border: 2px solid #666;
    font-family: "Press Start 2P", cursive;
    text-align: center;
    max-width: 500px;
    margin: auto;
    margin-bottom: 20px;
  }
  
  .achievement-title {
    font-size: 16px;
  }
  
  .achievement-desc {
    font-size: 12px;
    margin-top: 10px;
    color: #bbb;
  }
  </style>
  