const Button = {
  template: `
    <a :href="buttonLink" class="btn btn-primary d-flex align-items-center">
      <img :src="buttonImage" alt="" style="width: 20px; height: 20px; margin-right: 5px;">
      {{ buttonText }}
    </a>
  `,
  props: {
    buttonText: String,
    buttonLink: String,
    buttonImage: String
  }
};

// Registra o componente globalmente se estiver em um arquivo separado
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.component('app-button', Button);
}

// Exporta para uso em outros módulos
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Button;
} else if (typeof define === 'function' && define.amd) {
  define([], function() { return Button; });
} else {
  window.Button = Button;
}