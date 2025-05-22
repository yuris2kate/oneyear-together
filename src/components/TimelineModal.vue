<template>
  <div
    v-if="show"
    class="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50"
  >
    <div class="bg-white p-6 rounded-xl w-full max-w-md shadow-lg">
      <h2 class="text-xl font-semibold mb-4">Adicionar evento</h2>

      <input type="file" accept="image/*" @change="handleImage" class="mb-3" />
      <input
        v-model="description"
        type="text"
        placeholder="Descrição"
        class="w-full p-2 mb-3 border rounded"
      />
      <input
        v-model="date"
        type="date"
        class="w-full p-2 mb-3 border rounded"
      />

      <div class="flex justify-end gap-3">
        <button
          @click="$emit('close')"
          class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        >
          Cancelar
        </button>
        <button
          @click="save"
          class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Salvar
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["show"],
  data() {
    return {
      imageBase64: "",
      description: "",
      date: "",
    };
  },
  methods: {
    handleImage(e) {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = () => {
        this.imageBase64 = reader.result;
      };
      reader.readAsDataURL(file);
    },
    save() {
      if (!this.imageBase64 || !this.description || !this.date) {
        alert("Preencha todos os campos!");
        return;
      }

      const newItem = {
        id: Date.now(),
        image: this.imageBase64,
        description: this.description,
        date: this.date,
      };
      this.$emit("save", newItem);
      this.reset();
    },
    reset() {
      this.imageBase64 = "";
      this.description = "";
      this.date = "";
    },
  },
};
</script>

<style scoped>
/* Estilização opcional, já usamos Tailwind */
</style>
