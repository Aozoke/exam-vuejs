<template>
  <div class="min-h-screen bg-gray-900 text-gray-100 p-6 space-y-6">
    <div class="text-center">
      <h1 class="text-3xl font-bold mb-2">Bienvenue sur la page d'accueil</h1>
      <p class="text-lg">
        Vous êtes connecté en tant que <strong>{{ role }}</strong>.
      </p>
    </div>

    <!-- Slider Section -->
    <SliderComponent :images="sliderImages" />

    <!-- Contenu spécifique au rôle -->
    <div
      :class="role === 'admin' ? 'bg-gray-800' : 'bg-gray-700'"
      class="rounded-lg shadow-lg p-6 space-y-4"
    >
      <h2 class="text-xl font-semibold">
        {{ role === 'admin' ? 'Tableau de bord Admin' : 'Tableau de bord Étudiant' }}
      </h2>
      <p>
        {{ role === 'admin'
          ? 'Accédez à la gestion des utilisateurs et des données.'
          : 'Consultez vos notes et votre planning.' }}
      </p>

      <button
        v-if="role === 'admin'"
        @click="goToAdminPanel"
        class="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-400"
      >
        Accéder à l'Admin Panel
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useAuthStore } from "../stores/uthStore";
import { useRouter } from "vue-router";
import SliderComponent from "../components/SliderComponent.vue";
import { useImageStore } from "../stores/imageStore"; // Importer le store des images

export default defineComponent({
  name: "Home",
  components: {
    SliderComponent,
  },
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();
    const imageStore = useImageStore();

    const role = computed(() => authStore.userRole);

    // Récupérer les images depuis le store
    const sliderImages = computed(() => imageStore.images);

    const goToAdminPanel = () => {
      router.push({ name: "admin-panel" });
    };

    return {
      role,
      sliderImages, // Passer les images au composant Slider
      goToAdminPanel,
    };
  },
});
</script>
