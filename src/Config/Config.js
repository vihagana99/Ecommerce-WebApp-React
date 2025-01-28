import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, getDoc, doc, setDoc } from 'firebase/firestore'; // Add setDoc import
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDQU4xtAjUt-Qtkty5UMLf5fZtScZjDo0Y",
  authDomain: "ecommerce-app-react-65e14.firebaseapp.com",
  projectId: "ecommerce-app-react-65e14",
  storageBucket: "ecommerce-app-react-65e14.firebasestorage.app",
  messagingSenderId: "406116218361",
  appId: "1:406116218361:web:bc9cbd580f5a17eefaf928",
  measurementId: "G-DT0ELY6YFW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const auth = getAuth(app);
const fs = getFirestore(app); // Initialize Firestore
const storage = getStorage(app);

export { auth, fs, storage, collection, getDoc, doc, setDoc }; // Export setDoc
