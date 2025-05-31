<template>
    <div class="marquee-container">
      <div class="marquee">
        <span v-for="(item, index) in items" :key="index" class="marquee-item">
          {{ item.title }}
        </span>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps } from "vue";
  
  const props = defineProps({
    items: Array, // Recebe uma lista de textos
  });
  </script>
  
  <style scoped>
  .marquee-container {
    max-width: 90vw;
    overflow: hidden;
    padding: 10px 0;
    white-space: nowrap;
    position: relative;
  }
  
  .marquee {
    display: flex;
    gap: 50px;
    animation: scroll 40s linear infinite;
  }
  
  .marquee-item {
    font-size: 24px;
    font-weight: bold;
    color: #444;
    display: inline-block;
    padding: 5px 15px;
    background: pink;
    border-radius: 15px;
  }
  
  @keyframes scroll {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(-100%);
    }
  }
  </style>
  