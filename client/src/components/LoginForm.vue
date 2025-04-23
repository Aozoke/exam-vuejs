// src/components/LoginForm.vue
<template>
  <div class="flex justify-center items-center h-screen bg-gray-100">
    <div class="bg-transparent p-8 rounded-lg shadow-xl max-w-sm w-full border border-gray-300">
      <h2 class="text-3xl font-semibold text-center text-gray-700 mb-6">Connexion</h2>
      
      <!-- Formulaire de connexion -->
      <form @submit.prevent="handleLogin" class="space-y-6">
        <!-- Identifiant -->
        <div>
          <label for="username" class="block text-gray-600 font-medium mb-1">Identifiant</label>
          <input
            type="email"
            id="username"
            v-model="email"
            class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:outline-none transition-all"
            placeholder="Entrez votre identifiant"
            required
          />
        </div>
        
        <!-- Mot de passe -->
        <div>
          <label for="password" class="block text-gray-600 font-medium mb-1">Mot de passe</label>
          <input
            type="password"
            id="password"
            v-model="password"
            class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:outline-none transition-all"
            placeholder="Entrez votre mot de passe"
            required
          />
        </div>
        
        <!-- Bouton de connexion -->
        <div>
          <button
            type="submit"
            class="w-full py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            Se connecter
          </button>
        </div>
      </form>
      
      <!-- Option de réinitialisation du mot de passe -->
      <div class="text-center mt-4">
        <a href="#" class="text-sm text-gray-500 hover:text-gray-700 transition-colors">Mot de passe oublié ?</a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/uthStore'; // Import du store Pinia

export default {
  name: 'LoginForm',
  setup() {
    const router = useRouter();
    const email = ref('');
    const password = ref('');
    const authStore = useAuthStore(); // Initialiser le store d'authentification

    // Fonction pour gérer la connexion
    const handleLogin = async () => {
      await authStore.login(email.value, password.value);

      if (authStore.userRole) {
        router.push({ name: 'home' });
      }
    };

    return {
      email,
      password,
      handleLogin,
    };
  },
};
</script>

<style scoped>
/* Pas besoin de styles supplémentaires car tout est géré par Tailwind CSS */
</style>
