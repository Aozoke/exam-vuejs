<template>
  <nav class="navbar flex items-center justify-between px-6 py-4 shadow-md">
    <!-- Logo -->
    <div class="logo flex items-center space-x-3">
      <img src="" alt="Logo" class="h-8 w-8 object-cover" />
    </div>

    <!-- Menu (Hamburger Menu + Liens) -->
    <div class="relative">
      
      <button
        @click="toggleMenu"
        class="block md:hidden text-gray-500 hover:text-gray-700 focus:outline-none"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      </button>

      <!-- Liste des menus -->
      <ul :class="['menu', isMenuOpen ? 'block' : 'hidden', 'absolute md:relative top-12 md:top-0 left-0 right-0 md:flex bg-white md:bg-transparent z-10 space-y-4 md:space-y-0 md:space-x-6 py-4 md:py-0 px-6 md:px-0 border-t md:border-t-0 md:border-none']">
        <li>
          <router-link
            to="/home"
            class="text-gray-600 hover:text-blue-500 transition-colors font-medium"
            active-class="text-blue-500">
            Home
          </router-link>
        </li>
        <li>
          <router-link
            to="/planning"
            class="text-gray-600 hover:text-blue-500 transition-colors font-medium"
            active-class="text-blue-500">
            Planning
          </router-link>
        </li>
        <li>
          <router-link
            to="/notes"
            class="text-gray-600 hover:text-blue-500 transition-colors font-medium"
            active-class="text-blue-500">
            Notes
          </router-link>
        </li>
        <li v-if="role === 'admin'">
          <router-link
            to="/actualites"
            class="text-gray-600 hover:text-blue-500 transition-colors font-medium"
            active-class="text-blue-500">
            Actualités
          </router-link>
        </li>
        <li v-if="role === 'admin'">
          <router-link
            to="/admin-panel"
            class="text-gray-600 hover:text-blue-500 transition-colors font-medium"
            active-class="text-blue-500" >
            Panneau Admin
          </router-link>
        </li>
        <li v-if="isLoggedIn">
          <button
            @click="logout"
            class="bg-transparent text-gray-600 hover:text-red-500 transition-colors font-medium" >
            Déconnexion
          </button>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script lang="ts">
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/uthStore";

export default {
  setup() {
    const router = useRouter();
    const authStore = useAuthStore();
    const isMenuOpen = ref(false);

    const toggleMenu = () => {
      isMenuOpen.value = !isMenuOpen.value;
    };

    // Fonction de déconnexion
    const logout = () => {
      authStore.logout();
      router.push({ name: "login" });
    };

    // Vérification du rôle et de la connexion
    const role = computed(() => authStore.userRole); // Récupère le rôle (admin ou étudiant)
    const isLoggedIn = computed(() => !!authStore.userRole); // Vérifie si l'utilisateur est connecté

    return {
      role,
      isLoggedIn,
      isMenuOpen,
      toggleMenu,
      logout,
    };
  },
};
</script>

<style scoped>
/* Pas de styles supplémentaires nécessaires grâce à Tailwind */
</style>
