document.addEventListener('DOMContentLoaded', function() {
  const { createApp } = Vue;
  
  const app = createApp({
    // Sua lógica principal aqui
  });

  // Registra todos os componentes armazenados
  app.component('app-button', window.MyApp.components.Button);
  app.component('navbar', window.MyApp.components.Navbar);

  app.mount('#app');
});