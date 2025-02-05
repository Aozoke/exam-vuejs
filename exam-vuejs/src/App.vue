<template>
  <div id="app" class="flex flex-col p-4 md:p-6">
    <!-- Afficher la Navbar seulement si l'utilisateur est authentifié -->
    <Navbar v-if="isAuthenticated" class="mb-4" />

    <!-- Afficher le contenu de la route -->
    <router-view class="flex-grow" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, watch } from 'vue';
import { useAuthStore } from './stores/uthStore';
import Navbar from './components/Navbar.vue';

export default defineComponent({
  name: 'App',
  components: { Navbar },
  setup() {
    const authStore = useAuthStore();

    // Computed pour vérifier si l'utilisateur est authentifié
    const isAuthenticated = computed(() => !!authStore.userRole);

    // Vérifie quand le userRole change, et log l'état
    watch(() => authStore.userRole, (newRole) => {
      console.log('User Role updated in App.vue:', newRole);
    });

    // Cela peut être utile pour initialiser des choses après la connexion
    watch(isAuthenticated, (authenticated) => {
      if (authenticated) {
        console.log('Utilisateur authentifié et connecté');
      }
    });

    return { isAuthenticated };
  },
});
</script>

<style scoped>
/* Aucune modification nécessaire dans cette section pour Tailwind CSS */
</style>
