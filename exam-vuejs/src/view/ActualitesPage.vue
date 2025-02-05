<template>
  <div class="actualites-page p-6 md:p-8">
    <Navbar v-if="isAuthenticated" />

    <!-- Titre de la page -->
    <div class="text-center mb-6">
      <h1 class="text-3xl font-semibold text-gray-200 mb-2">Actualités</h1>
      <p class="text-gray-400">
        Vous êtes connecté en tant que <strong>{{ userRole }}</strong>.
      </p>
    </div>

    <!-- Formulaire pour ajouter une image (visible si admin) -->
    <div v-if="isAdmin" class="bg-gray-800 p-6 rounded-lg shadow-lg mb-6">
      <h2 class="text-xl font-semibold mb-4 text-gray-100">Ajouter une nouvelle image</h2>
      <form @submit.prevent="addImage" class="space-y-4">
        <div class="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div class="w-full sm:w-auto">
            <label for="imageUpload" class="block text-sm font-medium text-gray-300 mb-1">
              Sélectionner une image
            </label>
            <input
              type="file"
              id="imageUpload"
              accept="image/*"
              @change="handleImageUpload"
              class="block w-full border border-gray-500 px-3 py-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            class="bg-blue-600 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-700 transition-all"
          >
            Ajouter
          </button>
        </div>
      </form>
    </div>

    <!-- Slider d'images -->
    <div v-if="images.length" class="space-y-6">
      <h2 class="text-xl font-semibold text-center text-gray-200">Slider d'Images</h2>
      <div class="flex gap-4 overflow-x-auto py-4">
        <div
          v-for="(image, index) in images"
          :key="index"
          class="relative flex-shrink-0 w-72 h-48"
        >
          <img
            :src="image"
            alt="Slider Image"
            class="w-full h-full object-cover rounded-lg shadow-md"
          />
          <button
            @click="removeImage(index)"
            class="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 transition-colors"
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";
import { useAuthStore } from "../stores/uthStore";
import { useImageStore } from "../stores/imageStore"; // Importer le store des images

export default defineComponent({
  name: "Actualite",
  setup() {
    const authStore = useAuthStore();
    const imageStore = useImageStore();

    // Vérification du rôle utilisateur
    const isAdmin = computed(() => authStore.userRole === "admin");
    const userRole = computed(() => authStore.userRole);
    const isAuthenticated = computed(() => !!authStore.userRole);

    // Références pour ajouter une image
    const newImageFile = ref<File | null>(null);

    // Récupérer les images depuis le store
    const images = computed(() => imageStore.images);

    // Fonction pour gérer l'upload d'image
    const handleImageUpload = (event: Event) => {
      const fileInput = event.target as HTMLInputElement;
      const file = fileInput.files ? fileInput.files[0] : null;

      if (file && file.type.startsWith("image/")) {
        newImageFile.value = file;
      } else {
        alert("Veuillez sélectionner un fichier image valide.");
      }
    };

    // Fonction pour ajouter une image au slider
    const addImage = () => {
      if (newImageFile.value) {
        const reader = new FileReader();
        reader.onload = () => {
          const imageUrl = reader.result as string;
          imageStore.addImage(imageUrl); // Ajouter l'image au store
        };
        reader.readAsDataURL(newImageFile.value); // Lire l'image en tant que Data URL
      } else {
        alert("Veuillez sélectionner un fichier image.");
      }
    };

    // Fonction pour supprimer une image
    const removeImage = (index: number) => {
      imageStore.removeImage(index);
    };

    return {
      isAdmin,
      userRole,
      isAuthenticated,
      images,
      addImage,
      removeImage,
      handleImageUpload,
    };
  },
});
</script>
