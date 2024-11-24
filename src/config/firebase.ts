import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "dhp-5000.firebaseapp.com",
  projectId: "dhp-5000",
  storageBucket: "dhp-5000.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

console.log('Initializing Firebase...');
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
console.log('Firebase initialized, Firestore ready'); 