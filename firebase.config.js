// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCrBDy1EBIHrIS8PvFN2x45N8YnwGUveBc",
  authDomain: "otp-project-cde2e.firebaseapp.com",
  projectId: "otp-project-cde2e",
  storageBucket: "otp-project-cde2e.appspot.com",
  messagingSenderId: "226547649113",
  appId: "1:226547649113:web:c83b34aa010bb37c82bf48",
  measurementId: "G-BC0LC5B2W6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
