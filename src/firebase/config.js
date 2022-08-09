import { initializeApp } from "firebase/app";
import { getFirestore }  from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD3V0zSfj7sYM_z8Jp9e_ITHVcryelqlr4",
  authDomain: "iaw-react-app.firebaseapp.com",
  projectId: "iaw-react-app",
  storageBucket: "iaw-react-app.appspot.com",
  messagingSenderId: "454624438724",
  appId: "1:454624438724:web:7d6edf0980b21edd3b5c91",
  measurementId: "G-W862M6VVMB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);