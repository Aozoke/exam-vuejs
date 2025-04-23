// src/stores/authStore.ts
import { defineStore } from 'pinia';
import { auth, db } from '../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

export const useAuthStore = defineStore('authStore', {
  state: () => ({
    userRole: null,
    user: null, // Pour stocker l'utilisateur connecté
  }),

  actions: {
    async login(email: string, password: string) {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        this.user = user;
    
        // Debugging : Afficher l'uid et l'email pour vérifier
        console.log("UID de l'utilisateur connecté:", user.uid);
        console.log("Email de l'utilisateur connecté:", user.email);
    
        // Récupérer le rôle de l'utilisateur depuis Firestore en utilisant l'uid
        const userRole = await this.getUserRole(user.uid); // Utilise l'uid ici
        this.userRole = userRole;
    
        // Optionnel : tu peux stocker le rôle dans le sessionStorage ou localStorage si nécessaire
        // localStorage.setItem('userRole', userRole);  // Optionnel
      } catch (error) {
        console.error("Erreur de connexion : ", error);
        alert('Identifiant ou mot de passe incorrect');
      }
    },

    async getUserRole(uid: string) {
      try {
        // Recherche dans la collection Admins avec l'uid
        const adminDocRef = doc(db, 'Admins', uid); // Utilise l'uid comme identifiant
        const adminDoc = await getDoc(adminDocRef);
    
        if (adminDoc.exists()) {
          console.log("Utilisateur trouvé dans la collection Admins");
          return adminDoc.data()?.role || 'etudiant';  // Retourne le rôle s'il existe
        }
    
        // Recherche dans la collection Users si l'utilisateur n'est pas dans Admins
        const userDocRef = doc(db, 'Users', uid); // Utilise l'uid aussi pour Users
        const userDoc = await getDoc(userDocRef);
    
        if (userDoc.exists()) {
          console.log("Utilisateur trouvé dans la collection Users");
          return userDoc.data()?.role || 'etudiant';  // Retourne le rôle s'il existe
        }
    
        // Si l'utilisateur n'est pas trouvé dans les deux collections
        console.log("Aucun document trouvé pour cet utilisateur");
        return 'etudiant';  // Par défaut, retourner 'etudiant' si l'utilisateur n'est pas trouvé
      } catch (error) {
        console.error("Erreur lors de la récupération du rôle : ", error);
        return 'etudiant';  // Retourne 'etudiant' par défaut en cas d'erreur
      }
    }
    ,

    logout() {
      this.userRole = null;
      this.user = null;
      // Optionnel : déconnecte l'utilisateur
      // auth.signOut();
    },
  },
});
