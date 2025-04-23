import { defineStore } from "pinia"; // ou Vuex si tu utilises Vuex
import { ref } from "vue";

export const useImageStore = defineStore("imageStore", () => {
  // On initialise un tableau d'images
  const images = ref<string[]>([]);

  // Fonction pour ajouter une image
  const addImage = (imageUrl: string) => {
    images.value.push(imageUrl);
  };

  // Fonction pour supprimer une image
  const removeImage = (index: number) => {
    images.value.splice(index, 1);
  };

  return {
    images,
    addImage,
    removeImage,
  };
});
