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

// Armazena o componente para registro posterior
window.MyApp.components.Button = Button;