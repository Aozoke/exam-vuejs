<template>
  <div class="min-h-screen bg-gray-950 text-gray-200 p-6 md:p-10 space-y-6">
    <!-- Navbar -->
    <Navbar v-if="isAuthenticated" />

    <!-- Titre principal -->
    <div class="text-center">
      <h1 class="text-3xl md:text-4xl font-extrabold mb-4 text-gray-100">Page des Notes</h1>
      <p class="text-lg text-gray-400">
        Vous êtes connecté en tant que <strong>{{ userRole }}</strong>.
      </p>
    </div>

    <!-- Formulaire pour ajouter une nouvelle note -->
    <div v-if="isAdmin" class="bg-gray-900 p-6 md:p-8 rounded-lg shadow-md">
      <h2 class="text-2xl font-semibold mb-4 text-gray-100">Ajouter une nouvelle note</h2>
      <form @submit.prevent="addNewNote" class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label for="studentName" class="block text-sm text-gray-300 mb-1">Nom de l'Élève</label>
            <input
              v-model="newNote.studentName"
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
              v-model="newNote.subject"
              type="text"
              id="subject"
              placeholder="Matière"
              class="w-full bg-gray-800 text-gray-300 border border-gray-700 rounded-lg p-2 focus:outline-none focus:ring focus:ring-gray-600"
              required
            />
          </div>
          <div>
            <label for="grade" class="block text-sm text-gray-300 mb-1">Note</label>
            <input
              v-model="newNote.grade"
              type="number"
              id="grade"
              placeholder="Note sur 20"
              class="w-full bg-gray-800 text-gray-300 border border-gray-700 rounded-lg p-2 focus:outline-none focus:ring focus:ring-gray-600"
              :max="20"
              :min="0"
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

    <!-- Tableau des notes -->
    <div class="bg-gray-900 p-6 md:p-8 rounded-lg shadow-md overflow-x-auto">
      <table class="table-auto w-full text-sm text-left text-gray-300">
        <thead class="bg-gray-800 text-gray-400">
          <tr>
            <th class="px-4 py-3">Nom de l'Élève</th>
            <th class="px-4 py-3">Matière</th>
            <th class="px-4 py-3">Note</th>
            <th v-if="isAdmin" class="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(entry, index) in notesData"
            :key="index"
            class="border-t border-gray-800 hover:bg-gray-800"
          >
            <td class="px-4 py-2">{{ entry.studentName }}</td>
            <td class="px-4 py-2">{{ entry.subject }}</td>
            <td class="px-4 py-2">
              <div v-if="isEditing === index">
                <input
                  type="number"
                  v-model="editableNotes[index].grade"
                  class="w-full bg-gray-800 text-gray-300 border border-gray-700 rounded-lg p-1"
                  :max="20"
                  :min="0"
                />
              </div>
              <div v-else>
                {{ entry.grade }} / 20
              </div>
            </td>
            <td v-if="isAdmin" class="px-4 py-2 space-x-2">
              <button
                v-if="isEditing === index"
                @click="saveEdit(index)"
                class="bg-green-600 text-white px-4 py-1 rounded-lg hover:bg-green-700 focus:ring focus:ring-green-500"
              >
                Sauvegarder
              </button>
              <button
                v-else
                @click="editEntry(index)"
                class="bg-blue-600 text-white px-4 py-1 rounded-lg hover:bg-blue-700 focus:ring focus:ring-blue-500"
              >
                Modifier
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
  name: "Notes",
  setup() {
    const authStore = useAuthStore();

    const isAdmin = computed(() => authStore.userRole === "admin");
    const userRole = computed(() => authStore.userRole);
    const isAuthenticated = computed(() => !!authStore.userRole);

    const notesData = ref([
      { studentName: "Étudiant 1", subject: "Mathématiques", grade: 15 },
      { studentName: "Étudiant 2", subject: "Physique", grade: 12 },
      { studentName: "Étudiant 3", subject: "Chimie", grade: 18 },
    ]);

    const editableNotes = ref([...notesData.value]);
    const isEditing = ref<number | null>(null);

    const newNote = ref({
      studentName: "",
      subject: "",
      grade: null as number | null,
    });

    const editEntry = (index: number) => {
      isEditing.value = index;
    };

    const saveEdit = (index: number) => {
      notesData.value[index] = { ...editableNotes.value[index] };
      isEditing.value = null;
    };

    const addNewNote = () => {
      if (
        newNote.value.studentName &&
        newNote.value.subject &&
        newNote.value.grade !== null
      ) {
        notesData.value.push({ ...newNote.value });
        newNote.value = { studentName: "", subject: "", grade: null };
      } else {
        alert("Veuillez remplir tous les champs.");
      }
    };

    return {
      isAdmin,
      userRole,
      isAuthenticated,
      notesData,
      editableNotes,
      isEditing,
      editEntry,
      saveEdit,
      newNote,
      addNewNote,
    };
  },
});
</script>

<style scoped>
/* Pas besoin de styles additionnels avec Tailwind CSS */
</style>
