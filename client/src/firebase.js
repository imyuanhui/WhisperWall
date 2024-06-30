// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "whisper-wall-294a0.firebaseapp.com",
  projectId: "whisper-wall-294a0",
  storageBucket: "whisper-wall-294a0.appspot.com",
  messagingSenderId: "444558604406",
  appId: "1:444558604406:web:c1b0c82906944cde158757",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
