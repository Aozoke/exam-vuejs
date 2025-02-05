<template>
  <div class="min-h-screen bg-gray-950 text-gray-200 p-6 md:p-10 space-y-6">
    <!-- Titre principal -->
    <div class="text-center">
      <h1 class="text-3xl md:text-4xl font-extrabold mb-4 text-gray-100">Page Planning</h1>
      <p class="text-lg text-gray-400">
        Vous êtes connecté en tant que <strong>{{ userRole }}</strong>.
      </p>
    </div>

    <!-- Formulaire pour ajouter un nouvel étudiant -->
    <div v-if="isAdmin" class="bg-gray-900 p-6 md:p-8 rounded-lg shadow-md">
      <h2 class="text-2xl font-semibold mb-4 text-gray-100">Ajouter un nouvel étudiant</h2>
      <form @submit.prevent="addNewEntry" class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label for="studentName" class="block text-sm text-gray-300 mb-1">Nom de l'Étudiant</label>
            <input
              v-model="newEntry.studentName"
              type="text"
              id="studentName"
              placeholder="Nom de l'étudiant"
              class="w-full bg-gray-800 text-gray-300 border border-gray-700 rounded-lg p-2 focus:outline-none focus:ring focus:ring-gray-600"
              required
            />
          </div>
          <div>
            <label for="subject" class="block text-sm text-gray-300 mb-1">Matière</label>
            <input
              v-model="newEntry.subject"
              type="text"
              id="subject"
              placeholder="Matière"
              class="w-full bg-gray-800 text-gray-300 border border-gray-700 rounded-lg p-2 focus:outline-none focus:ring focus:ring-gray-600"
              required
            />
          </div>
          <div>
            <label for="hour" class="block text-sm text-gray-300 mb-1">Heure</label>
            <input
              v-model="newEntry.hour"
              type="time"
              id="hour"
              class="w-full bg-gray-800 text-gray-300 border border-gray-700 rounded-lg p-2 focus:outline-none focus:ring focus:ring-gray-600"
              required
            />
          </div>
          <div>
            <label for="teacher" class="block text-sm text-gray-300 mb-1">Intervenant</label>
            <input
              v-model="newEntry.teacher"
              type="text"
              id="teacher"
              placeholder="Intervenant"
              class="w-full bg-gray-800 text-gray-300 border border-gray-700 rounded-lg p-2 focus:outline-none focus:ring focus:ring-gray-600"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          class="w-full md:w-auto bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 focus:ring focus:ring-blue-500"
        >
          Ajouter
        </button>
      </form>
    </div>

    <!-- Tableau Planning -->
    <div class="bg-gray-900 p-6 md:p-8 rounded-lg shadow-md overflow-x-auto">
      <table class="table-auto w-full text-sm text-left text-gray-300">
        <thead class="bg-gray-800 text-gray-400">
          <tr>
            <th class="px-4 py-3">Étudiant</th>
            <th class="px-4 py-3">Matière</th>
            <th class="px-4 py-3">Heure</th>
            <th class="px-4 py-3">Intervenant</th>
            <th v-if="isAdmin" class="px-4 py-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(entry, index) in planningData"
            :key="index"
            class="border-t border-gray-800 hover:bg-gray-800"
          >
            <td class="px-4 py-2">{{ entry.studentName }}</td>
            <td class="px-4 py-2">{{ entry.subject }}</td>
            <td class="px-4 py-2">
              <div v-if="isEditing === index">
                <input
                  type="time"
                  v-model="editableData[index].hour"
                  class="w-full bg-gray-800 text-gray-300 border border-gray-700 rounded-lg p-1"
                />
              </div>
              <div v-else>
                {{ entry.hour }}
              </div>
            </td>
            <td class="px-4 py-2">
              <div v-if="isEditing === index">
                <input
                  type="text"
                  v-model="editableData[index].teacher"
                  class="w-full bg-gray-800 text-gray-300 border border-gray-700 rounded-lg p-1"
                />
              </div>
              <div v-else>
                {{ entry.teacher }}
              </div>
            </td>
            <td v-if="isAdmin" class="px-4 py-2 text-center space-x-2">
              <button
                v-if="isEditing === index"
                @click="saveEdit(index)"
                class="bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700 focus:ring focus:ring-green-500"
              >
                Sauvegarder
              </button>
              <button
                v-else
                @click="editEntry(index)"
                class="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 focus:ring focus:ring-blue-500"
              >
                Modifier
              </button>
              <button
                @click="removeEntry(index)"
                class="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700 focus:ring focus:ring-red-500"
              >
                Supprimer
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { useAuthStore } from "../stores/uthStore";

export default defineComponent({
  name: "Planning",
  setup() {
    const authStore = useAuthStore();

    const isAdmin = computed(() => authStore.userRole === "admin");
    const userRole = computed(() => authStore.userRole);

    const planningData = ref([
      { studentName: "Étudiant 1", subject: "Mathématiques", hour: "10:00", teacher: "M. Dupont" },
      { studentName: "Étudiant 2", subject: "Physique", hour: "12:00", teacher: "Mme Martin" },
      { studentName: "Étudiant 3", subject: "Chimie", hour: "14:00", teacher: "M. Laurent" },
    ]);

    const editableData = ref([...planningData.value]);
    const isEditing = ref<number | null>(null);

    const editEntry = (index: number) => {
      isEditing.value = index;
    };

    const saveEdit = (index: number) => {
      planningData.value[index] = { ...editableData.value[index] };
      isEditing.value = null;
    };

    const newEntry = ref({
      studentName: "",
      subject: "",
      hour: "",
      teacher: "",
    });

    const addNewEntry = () => {
      planningData.value.push({ ...newEntry.value });
      newEntry.value = { studentName: "", subject: "", hour: "", teacher: "" };
    };

    const removeEntry = (index: number) => {
      planningData.value.splice(index, 1);
    };

    return {
      isAdmin,
      userRole,
      planningData,
      editableData,
      isEditing,
      editEntry,
      saveEdit,
      newEntry,
      addNewEntry,
      removeEntry,
    };
  },
});
</script>

<style scoped>
/* Pas besoin de styles additionnels avec Tailwind CSS */
</style>
