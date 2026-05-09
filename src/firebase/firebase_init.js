// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD2scTb6xa5fKbmdn7zMKSIRtNQ42MShNs",
  authDomain: "mtpm-3b737.firebaseapp.com",
  projectId: "mtpm-3b737",
  storageBucket: "mtpm-3b737.firebasestorage.app",
  messagingSenderId: "731105592324",
  appId: "1:731105592324:web:e7d5142390c6039a806151"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
