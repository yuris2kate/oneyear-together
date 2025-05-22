<template>
  <div>
    <!-- Botão para abrir o modal -->
    <button type="button" class="kawaii-btn" @click="abrirModal">
      <span class="kawaii-icon">🌸</span> Mostrar Tutorial
      <span class="kawaii-icon">🌸</span>
    </button>

    <!-- Modal kawaii -->
    <div
      class="modal-kawaii fade"
      :class="{ show: modalVisivel }"
      v-show="modalVisivel"
      tabindex="-1"
      @click.self="fecharModal"
    >
      <div class="modal-dialog-kawaii modal-dialog-centered">
        <div class="modal-content-kawaii">
          <div class="modal-header-kawaii d-flex">
            <h5 class="modal-title-kawaii">
              <span class="title-icon">📝</span>
              Tutorial do Sistema (Passo {{ passoAtual + 1 }} de 4)
              <span class="title-icon">🎀</span>
            </h5>
            <button
              type="button"
              class="close-kawaii"
              @click="fecharModal"
              aria-label="Fechar"
            >
              <span class="close-icon">❌</span>
            </button>
          </div>
          <div class="modal-body-kawaii">
            <!-- Conteúdo dos passos diretamente na template -->
            <div v-if="passoAtual === 0" class="kwaii-step">
              <span class="step-number-kawaii">1</span>
              <h4 class="step-title-kawaii">Exportar conversa do WhatsApp</h4>
              <ol class="kwaii-instructions">
                <li>Abra o WhatsApp no seu celular</li>
                <li>Abra a conversa que deseja exportar</li>
                <li>
                  Toque nos três pontinhos <span class="kwaii-dots">⋮</span> no
                  canto superior direito
                </li>
                <li>
                  Procure a opção
                  <strong class="kwaii-highlight">"Exportar conversa"</strong>
                </li>
                <li>
                  Se não encontrar, toque em
                  <strong class="kwaii-highlight">"Mais"</strong> para ver mais
                  opções
                </li>
              </ol>
              <div class="kwaii-alert">
                💡 Atenção: Seleciona a opção
                <span style="font-weight: 700">"Sem mídia"</span> para exportar
              </div>
              <div class="kwaii-image-gallery">
                <div class="kwaii-image-container">
                  <img
                    src="../assets/tutorial-1.png"
                    alt="Passo 1 do tutorial"
                    class="kwaii-image"
                  />
                  <img
                    src="../assets/tutorial-2.png"
                    alt="Passo 2 do tutorial"
                    class="kwaii-image"
                  />
                  <img
                    src="../assets/tutorial-3.png"
                    alt="Passo 3 do tutorial"
                    class="kwaii-image"
                  />
                </div>
              </div>
            </div>

            <div v-if="passoAtual === 1" class="kwaii-step">
              <span class="step-number-kawaii">2</span>
              <h4 class="step-title-kawaii">
                Transferindo o arquivo para o PC
              </h4>
              <p>
                Após gerar ou localizar o arquivo
                <strong class="kwaii-highlight">.txt</strong> no seu celular,
                você precisa enviá-lo para o computador. Existem diversas formas
                de fazer isso:
              </p>
              <ul class="kwaii-instructions">
                <li>
                  Envie o arquivo para você mesmo pelo
                  <strong>WhatsApp</strong> e baixe no
                  <strong>WhatsApp Web</strong>
                </li>
                <li>
                  Use o <strong>Pushbullet</strong> para enviar diretamente para
                  o PC
                </li>
                <li>
                  Use <strong>Google Drive</strong> ou
                  <strong>OneDrive</strong> para compartilhar o arquivo
                </li>
                <li>
                  Conecte o cabo USB e copie manualmente o arquivo para a
                  máquina
                </li>
              </ul>
            </div>

            <div v-if="passoAtual === 2" class="kwaii-step">
              <span class="step-number-kawaii">3</span>
              <h4 class="step-title-kawaii">Importando o arquivo</h4>
              <p>
                Após transferir o arquivo para o computador, localize o
                <strong class="kwaii-highlight">.zip</strong> enviado pelo
                WhatsApp. Extraia o conteúdo e encontre o arquivo de conversa
                com extensão <strong>.txt</strong>.
              </p>
              <p>
                Antes de importar, <strong>abra o arquivo .txt</strong> em um
                editor de texto (como Bloco de Notas) e
                <strong>apague a primeira linha</strong>, que geralmente é uma
                mensagem de aviso do WhatsApp, como:
                <em
                  >“As mensagens e ligações são protegidas com a criptografia de
                  ponta a ponta...”</em
                >
              </p>
              <p>
                Com o arquivo corrigido, <strong>arraste o .txt</strong> para a
                área mostrada abaixo.
              </p>
              <div class="kwaii-alert">
                ⚠️ Importante: O sistema não ignora automaticamente a primeira
                linha. Você precisa apagar manualmente antes de importar!
              </div>
            </div>

            <div v-if="passoAtual === 3" class="kwaii-step-final">
              <h4 class="step-title-kawaii">Parabéns! 🎉</h4>
              <p>Você completou o tutorial, você é uma menina muito inteligente.</p>
              <p>Qualquer dúvida fale com o Yuri, ele é SEU namorado.</p>
              <div class="kwaii-celebration">✨🌸🎀✨</div>
            </div>
          </div>
          <div class="modal-footer-kawaii">
            <button
              type="button"
              class="kawaii-btn kawaii-btn-prev"
              @click="passoAnterior"
              :disabled="passoAtual === 0"
            >
              <span class="btn-icon">👈</span> Anterior
            </button>
            <div class="progress-kawaii">
              <div
                class="progress-bar-kawaii"
                role="progressbar"
                :style="{ width: progresso + '%' }"
                :aria-valuenow="progresso"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
            <button
              type="button"
              class="kawaii-btn"
              :class="ultimoPasso ? 'kawaii-btn-finish' : 'kawaii-btn-next'"
              @click="proximoPasso"
            >
              {{ ultimoPasso ? "Finalizar 🎉" : "Próximo " }}
              <span v-if="!ultimoPasso" class="btn-icon">👉</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      modalVisivel: false,
      passoAtual: 0,
    };
  },
  computed: {
    progresso() {
      return ((this.passoAtual + 1) / 4) * 100;
    },
    ultimoPasso() {
      return this.passoAtual === 3;
    },
  },
  methods: {
    abrirModal() {
      this.modalVisivel = true;
      this.passoAtual = 0;
    },
    fecharModal() {
      this.modalVisivel = false;
    },
    proximoPasso() {
      if (this.ultimoPasso) {
        this.fecharModal();
      } else {
        this.passoAtual++;
      }
    },
    passoAnterior() {
      if (this.passoAtual > 0) {
        this.passoAtual--;
      }
    },
  },
};
</script>

<style scoped>
/* Estilos do modal kawaii (mantidos da versão anterior) */
.modal-kawaii {
  opacity: 0;
  transition: opacity 0.15s linear;
  pointer-events: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1050;
  overflow-y: auto;
  background-color: rgba(255, 182, 193, 0.7);
}

.modal-kawaii.show {
  opacity: 1;
  pointer-events: auto;
}

.modal-dialog-kawaii {
  position: relative;
  width: auto;
  margin: 0.5rem;
  pointer-events: none;
}

@media (min-width: 576px) {
  .modal-dialog-kawaii {
    max-width: 600px;
    margin: 1.75rem auto;
  }
}

.modal-content-kawaii {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  pointer-events: auto;
  background-color: #fff9fa;
  background-clip: padding-box;
  border: 3px solid #ffb6c1;
  border-radius: 20px;
  outline: 0;
  box-shadow: 0 0 15px rgba(255, 182, 193, 0.6);
}

/* Estilos específicos para o conteúdo das instruções */
.kwaii-step {
  padding: 0 10px;
}

.step-number-kawaii {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  background-color: #ff69b4;
  color: white;
  border-radius: 50%;
  margin-right: 10px;
  font-weight: bold;
}

.step-title-kawaii {
  color: #ff69b4;
  display: inline-block;
  margin-bottom: 15px;
}

.kwaii-instructions {
  padding-left: 40px;
}

.kwaii-instructions li {
  margin-bottom: 10px;
  position: relative;
  padding-left: 25px;
}

.kwaii-instructions li:before {
  content: "🌸";
  position: absolute;
  left: 0;
}

.kwaii-highlight {
  color: #ff69b4;
  background-color: #fff0f5;
  padding: 2px 5px;
  border-radius: 5px;
}

.kwaii-dots {
  color: #ff69b4;
  font-weight: bold;
  font-size: 1.2em;
}

.kwaii-image-placeholder {
  margin-top: 15px;
  padding: 20px;
  background-color: #fff0f5;
  border-radius: 10px;
  text-align: center;
  font-size: 2em;
}

.kwaii-alert {
  margin-top: 15px;
  padding: 10px 15px;
  background-color: #fff3cd;
  border-radius: 10px;
  color: #856404;
  border-left: 4px solid #ffeeba;
}

.kwaii-step-final {
  text-align: center;
  padding: 20px;
}

.kwaii-celebration {
  font-size: 2em;
  margin-top: 15px;
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

/* Estilos kawaii */
.modal-kawaii {
  transition: opacity 0.3s ease;
  font-family: "Comic Sans MS", "Marker Felt", "Arial Rounded MT Bold",
    sans-serif;
}

.modal-dialog-kawaii {
  max-width: 600px;
  margin: 1.75rem auto;
}

.modal-content-kawaii {
  border: 3px solid #ffb6c1;
  border-radius: 20px;
  background-color: #fff9fa;
  box-shadow: 0 0 15px rgba(255, 182, 193, 0.6);
}

.modal-header-kawaii {
  padding: 15px 20px;
  border-bottom: 2px dashed #ffb6c1;
  background-color: #fff0f5;
  border-radius: 17px 17px 0 0;
}

.modal-title-kawaii {
  margin: 0;
  color: #ff69b4;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 10px;
}

.modal-kawaii {
  opacity: 0;
  transition: opacity 0.15s linear;
  pointer-events: none;
}

.modal-kawaii.show {
  opacity: 1;
  pointer-events: auto;
}

.modal-dialog-kawaii {
  position: relative;
  width: auto;
  margin: 0.5rem;
  pointer-events: none;
}

@media (min-width: 576px) {
  .modal-dialog-kawaii {
    max-width: 600px;
    margin: 1.75rem auto;
  }
}

.modal-content-kawaii {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  pointer-events: auto;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  outline: 0;
}

.title-icon {
  font-size: 1.3em;
}

.close-kawaii {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #ff69b4;
  padding: 0;
  margin-left: auto;
}

.close-icon {
  display: inline-block;
  transition: transform 0.2s;
}

.close-kawaii:hover .close-icon {
  transform: scale(1.2);
}

.modal-body-kawaii {
  padding: 20px;
  min-height: 200px;
  color: #8b5f65;
  font-size: 1.1em;
  line-height: 1.6;
}

.modal-body-kawaii ol,
.modal-body-kawaii ul {
  padding-left: 25px;
}

.modal-body-kawaii li {
  margin-bottom: 10px;
  position: relative;
  padding-left: 30px;
}

.modal-body-kawaii li:before {
  content: "✨";
  position: absolute;
  left: 0;
}

.modal-body-kawaii strong {
  color: #ff69b4;
}

.modal-footer-kawaii {
  padding: 15px 20px;
  border-top: 2px dashed #ffb6c1;
  background-color: #fff0f5;
  border-radius: 0 0 17px 17px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
}

.kawaii-btn {
  border: none;
  border-radius: 50px;
  padding: 8px 20px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
  font-family: "Comic Sans MS", "Marker Felt", "Arial Rounded MT Bold",
    sans-serif;
  font-size: 1em;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.1);
}

.kawaii-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
}

.kawaii-btn:active {
  transform: translateY(1px);
}

.kawaii-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.kawaii-btn-prev {
  background-color: #ffdfba;
  color: #d67c30;
}

.kawaii-btn-next {
  background-color: #bae1ff;
  color: #308bd6;
}

.kawaii-btn-finish {
  background-color: #baffc9;
  color: #30d65a;
}

.progress-kawaii {
  flex-grow: 1;
  height: 15px;
  background-color: #ffe6eb;
  border-radius: 10px;
  overflow: hidden;
  margin: 0 15px;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
}

.progress-bar-kawaii {
  height: 100%;
  background: linear-gradient(90deg, #ffb6c1, #ff69b4);
  transition: width 0.4s ease;
  border-radius: 10px;
  position: relative;
  overflow: hidden;
}

.progress-bar-kawaii:after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.1) 0%,
    rgba(255, 255, 255, 0.4) 50%,
    rgba(255, 255, 255, 0.1) 100%
  );
  animation: progressShine 2s infinite;
}

@keyframes progressShine {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

.btn-icon {
  font-size: 1.2em;
}

.kawaii-icon {
  font-size: 1.2em;
  animation: float 2s ease-in-out infinite;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}

/* Estilo para o conteúdo das instruções */
.modal-body-kawaii h1,
.modal-body-kawaii h2 {
  color: #ff69b4;
  border-bottom: 2px dotted #ffb6c1;
  padding-bottom: 5px;
  margin-top: 20px;
}

.modal-body-kawaii h1:before,
.modal-body-kawaii h2:before {
  content: "🌸 ";
}

.modal-body-kawaii hr {
  border: none;
  height: 2px;
  background-image: linear-gradient(
    to right,
    transparent,
    #ffb6c1,
    transparent
  );
  margin: 20px 0;
}

/* Checkbox kawaii */
.modal-body-kawaii input[type="checkbox"] {
  appearance: none;
  -webkit-appearance: none;
  width: 20px;
  height: 20px;
  border: 2px solid #ff69b4;
  border-radius: 5px;
  outline: none;
  cursor: pointer;
  vertical-align: middle;
  position: relative;
  margin-right: 10px;
}

.modal-body-kawaii input[type="checkbox"]:checked {
  background-color: #ff69b4;
}

.modal-body-kawaii input[type="checkbox"]:checked:after {
  content: "✓";
  position: absolute;
  color: white;
  font-size: 14px;
  left: 3px;
  top: -1px;
}

.kwaii-image-gallery {
  margin: 20px 0;
  padding: 15px;
  background-color: #fff0f5;
  border-radius: 15px;
  border: 2px dashed #ffb6c1;
  text-align: center;
}

.kwaii-image-container {
  display: flex;
  justify-content: center;
  gap: 15px;
  flex-wrap: wrap;
  margin: 0 auto;
  max-width: 100%;
}

.kwaii-image {
  width: 150px; /* Tamanho ajustável */
  height: auto;
  border-radius: 10px;
  border: 3px solid #ff69b4;
  box-shadow: 0 4px 8px rgba(255, 105, 180, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  object-fit: cover;
}

.kwaii-image:hover {
  transform: scale(1.05) rotate(2deg);
  box-shadow: 0 6px 12px rgba(255, 105, 180, 0.3);
  z-index: 1;
}

/* Efeito especial para cada imagem */
.kwaii-image:nth-child(1):hover {
  transform: scale(1.05) rotate(-2deg);
}

.kwaii-image:nth-child(3):hover {
  transform: scale(1.05) rotate(2deg);
}

/* Responsividade */
@media (max-width: 576px) {
  .kwaii-image-container {
    flex-direction: column;
    align-items: center;
  }

  .kwaii-image {
    width: 80%;
    max-width: 200px;
    margin-bottom: 10px;
  }
}
</style>
