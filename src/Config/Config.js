import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, getDoc, doc, setDoc } from 'firebase/firestore'; // Add setDoc import
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDR_uCAp4b8uCOp_LN6ccER6ivUBYU21yw",
  authDomain: "e-commerce-react-31670.firebaseapp.com",
  projectId: "e-commerce-react-31670",
  storageBucket: "e-commerce-react-31670.firebasestorage.app",
  messagingSenderId: "684052674370",
  appId: "1:684052674370:web:7c02323a1370ecc900fadb",
  measurementId: "G-416G3QNN60"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const fs = getFirestore(app);
const storage = getStorage(app);

export { auth, fs, storage, collection, getDoc, doc, setDoc }; // Export setDoc

