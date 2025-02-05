import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAbK_uirde1WSrJJvngh6-ZzW6HuIMt03U",
  authDomain: "blabla-65a6f.firebaseapp.com",
  projectId: "blabla-65a6f",
  storageBucket: "blabla-65a6f.firebasestorage.app",
  messagingSenderId: "1048437399254",
  appId: "1:1048437399254:web:549997bdfe01b6981b3377"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };

