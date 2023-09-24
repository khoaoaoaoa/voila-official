// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyD9E_eNuBDRX5qhKYT1xUwuuK9-mN9m9Ro",
  authDomain: "voila-official-v2.firebaseapp.com",
  projectId: "voila-official-v2",
  storageBucket: "voila-official-v2.appspot.com",
  messagingSenderId: "649428969177",
  appId: "1:649428969177:web:fdb98dfed4a851468180c8",
  measurementId: "G-Z926XN4K5R",
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore();
export const usersColRef = collection(db, "users");
export const roomsColRef = collection(db, "rooms");
