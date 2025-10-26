// src/firebase.js
import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  updateProfile 
} from "firebase/auth";
import { 
  getFirestore, 
  collection, 
  getDocs, 
  doc, 
  setDoc 
} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB8cxnGedId_I8y0zC8uS5mRRdxTseEOSQ",
  authDomain: "mindbloom-database.firebaseapp.com",
  projectId: "mindbloom-database",
  storageBucket: "mindbloom-database.firebasestorage.app",
  messagingSenderId: "812181366157",
  appId: "1:812181366157:web:6707db8b8b0fe0f36a49c4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Export everything your components need
export { 
  auth, 
  db, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  updateProfile,
  collection,
  getDocs,
  doc,
  setDoc
};