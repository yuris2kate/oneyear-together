<template>
  <Bar
    id="my-chart-id"
    :options="chartOptions"
    :data="chartData"
    class="chart-size"
  />
</template>

<script>
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ChartDataLabels
);

export default {
  name: "BarChart",
  components: { Bar },
  props: {
    chartData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      chartDataKawaii: null,
      chartOptions: {
        responsive: true,
        plugins: {
          legend: {
            labels: {
              color: "#ff69b4",
              font: {
                family: "Comic Sans MS",
                size: 14,
              },
            },
            title: {
              display: true,
              text: "🌈 Quantidade de Caracteres por Dia 🐻",
              color: "#ff69b4",
              font: {
                size: 18,
                family: "Comic Sans MS",
              },
            },
          },
          tooltip: {
            backgroundColor: "#ffe4ec",
            titleColor: "#ff69b4",
            bodyColor: "#333",
            borderColor: "#ffb6c1",
            borderWidth: 1,
            titleFont: { family: "Comic Sans MS" },
            bodyFont: { family: "Comic Sans MS" },
          },
          datalabels: {
            align: "center",
            anchor: "center",
            color: "#333",
            font: {
              weight: "bold",
              family: "Comic Sans MS",
              size: 14,
            },
            formatter: (value) => value.toLocaleString(),
          },
        },
        scales: {
          x: {
            beginAtZero: true,
            grid: {
              display: false,
            },
            ticks: {
              color: "#ff69b4",
              font: {
                family: "Comic Sans MS",
                size: 12,
              },
            },
            title: {
              display: true,
              text: "📅 Dia da Semana",
              color: "#ff69b4",
              font: {
                family: "Comic Sans MS",
                size: 16,
              },
            },
          },
          y: {
            beginAtZero: true,
            grid: {
              color: "#ffd6e8",
              lineWidth: 1,
            },
            ticks: {
              color: "#ff69b4",
              font: {
                family: "Comic Sans MS",
                size: 12,
              },
            },
            title: {
              display: true,
              text: "✍️ Caracteres Digitados",
              color: "#ff69b4",
              font: {
                family: "Comic Sans MS",
                size: 16,
              },
            },
          },
        },
        elements: {
          bar: {
            borderRadius: 8, // Deixa a barra com cantos arredondados
            backgroundColor: "#87CEFA", // Cor pastel azul (pode trocar)
            borderWidth: 1,
            borderColor: "#ffaec9",
          },
        },
      },
    };
  },
  mounted() {
    // Quando o componente montar, cria uma cópia modificada com cores kawaii
    this.chartDataKawaii = {
      ...this.chartData,
      datasets: this.chartData.datasets.map((dataset, index) => ({
        ...dataset,
        
        borderRadius: 14,
        borderSkipped: false,
      })),
    };
  },
  methods: {
    showChart() {
      console.log(this.chartDataTeste);
    },
  },
};
</script>

<style scoped>
.chart-size {
  width: 100%; /* Define a largura do gráfico */
  height: 400px; /* Define a altura do gráfico */
}
</style>
