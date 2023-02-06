import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBvUYc8E_k59lGdaXBf-OfpTzqe7ojojIA",
  authDomain: "fir-auth-new-hindi.firebaseapp.com",
  projectId: "fir-auth-new-hindi",
  storageBucket: "fir-auth-new-hindi.appspot.com",
  messagingSenderId: "46218893169",
  appId: "1:46218893169:web:bfa4e54f980e040d0748d0",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();
