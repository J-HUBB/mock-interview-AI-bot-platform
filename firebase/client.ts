// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDsGEtZMXAJKdadHUxbNCQWndvIrCzXl40",
  authDomain: "preptech-7baf7.firebaseapp.com",
  projectId: "preptech-7baf7",
  storageBucket: "preptech-7baf7.firebasestorage.app",
  messagingSenderId: "204189508060",
  appId: "1:204189508060:web:28db25604ac1dd3a26ef19",
  measurementId: "G-MLELVZPBM9"
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);