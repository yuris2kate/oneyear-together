const Navbar = {
  template: `
    <nav class="navbar">
      <div class="menu mt-3">
        <app-button class="me-3" button-text="Home" button-link="/home" :button-image="homeImage"></app-button>
        <app-button class="me-3" button-text="Momentos" button-link="/momentos" :button-image="graphImage"></app-button>
        <app-button class="me-3" button-text="Whatsapp" button-link="/whatsapp" :button-image="contactImage"></app-button>
        <app-button button-text="Futuro" button-link="/enigma" :button-image="futureImage"></app-button>
      </div>
    </nav>
  `,
  data() {
    return {
      homeImage: 'assets/house.png',
      graphImage: 'assets/graph.png',
      contactImage: 'assets/contact.png',
      futureImage: 'assets/friends.png'
    };
  }
};

// Armazena o componente para registro posterior
window.MyApp.components.Navbar = Navbar;