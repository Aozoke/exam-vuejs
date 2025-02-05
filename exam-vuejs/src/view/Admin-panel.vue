<template>
  <div class="admin-panel p-6 bg-black min-h-screen text-white">
    <h1 class="text-3xl font-bold mb-6">Gestion des Étudiants</h1>

    <!-- Formulaire d'ajout d'étudiant -->
    <div class="add-student-form mb-8 bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 class="text-2xl font-semibold mb-4 text-white">Ajouter un étudiant</h2>
      <form @submit.prevent="addStudent" class="space-y-4">
        <div>
          <label for="firstName" class="block text-sm font-medium">Prénom</label>
          <input
            v-model="newStudent.firstName"
            type="text"
            id="firstName"
            placeholder="Entrez le prénom"
            required
            class="w-full mt-1 p-3 border border-gray-600 rounded-md bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
          />
        </div>
        <div>
          <label for="lastName" class="block text-sm font-medium">Nom</label>
          <input
            v-model="newStudent.lastName"
            type="text"
            id="lastName"
            placeholder="Entrez le nom"
            required
            class="w-full mt-1 p-3 border border-gray-600 rounded-md bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
          />
        </div>
        <div>
          <label for="email" class="block text-sm font-medium">Email</label>
          <input
            v-model="newStudent.email"
            type="email"
            id="email"
            placeholder="Entrez l'email"
            required
            class="w-full mt-1 p-3 border border-gray-600 rounded-md bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
          />
        </div>
        <button
          type="submit"
          class="w-full py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-all"
        >
          Ajouter
        </button>
      </form>
    </div>

    <!-- Tableau des étudiants -->
    <div class="table-container overflow-x-auto">
      <h2 class="text-2xl font-semibold mb-4">Liste des Étudiants</h2>
      <table class="w-full border-collapse bg-gray-900 shadow-md rounded-lg">
        <thead>
          <tr class="bg-gray-700 text-gray-300 uppercase text-sm leading-normal">
            <th class="px-6 py-3 text-left">ID</th>
            <th class="px-6 py-3 text-left">Nom</th>
            <th class="px-6 py-3 text-left">Prénom</th>
            <th class="px-6 py-3 text-left">Email</th>
            <th class="px-6 py-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody class="text-gray-300 text-sm">
          <tr
            v-for="(student, index) in students"
            :key="student.id"
            class="border-b border-gray-700 hover:bg-gray-800"
          >
            <td class="px-6 py-3">{{ student.id }}</td>
            <td class="px-6 py-3">{{ student.lastName }}</td>
            <td class="px-6 py-3">{{ student.firstName }}</td>
            <td class="px-6 py-3">{{ student.email }}</td>
            <td class="px-6 py-3 flex items-center space-x-2">
              <button
                class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                @click="editStudent(student)"
              >
                Modifier
              </button>
              <button
                class="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                @click="deleteStudent(student.id)"
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
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "AdminPanel",
  setup() {
    const students = ref([
      { id: 1, firstName: "Alice", lastName: "Dupont", email: "alice.dupont@example.com" },
      { id: 2, firstName: "Bob", lastName: "Martin", email: "bob.martin@example.com" },
      { id: 3, firstName: "Charlie", lastName: "Durand", email: "charlie.durand@example.com" },
    ]);

    const newStudent = ref({
      firstName: "",
      lastName: "",
      email: "",
    });

    const addStudent = () => {
      if (newStudent.value.firstName && newStudent.value.lastName && newStudent.value.email) {
        const newId =
          students.value.length > 0 ? students.value[students.value.length - 1].id + 1 : 1;

        students.value.push({
          id: newId,
          firstName: newStudent.value.firstName,
          lastName: newStudent.value.lastName,
          email: newStudent.value.email,
        });

        newStudent.value = {
          firstName: "",
          lastName: "",
          email: "",
        };

        alert("Étudiant ajouté avec succès !");
      } else {
        alert("Veuillez remplir tous les champs !");
      }
    };

    const editStudent = (student: any) => {
      alert(`Modifier les informations de l'étudiant : ${student.firstName} ${student.lastName}`);
    };

    const deleteStudent = (id: number) => {
      const confirmDelete = confirm("Voulez-vous vraiment supprimer cet étudiant ?");
      if (confirmDelete) {
        students.value = students.value.filter((student) => student.id !== id);
        alert("Étudiant supprimé avec succès.");
      }
    };

    return {
      students,
      newStudent,
      addStudent,
      editStudent,
      deleteStudent,
    };
  },
});
</script>

<style scoped>
/* Aucun CSS supplémentaire, tout est dans Tailwind */
</style>
