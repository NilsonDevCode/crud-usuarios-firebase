// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // ← ESTA LÍNEA TE FALTA
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCOXPSgdlylYqA_yP3fKBmblZ788vQZ2BU",
  authDomain: "proyecto1892-1988c.firebaseapp.com",
  projectId: "proyecto1892-1988c",
  storageBucket: "proyecto1892-1988c.firebasestorage.app",
  messagingSenderId: "36956619194",
  appId: "1:36956619194:web:2aa8215d9ae55a31159d83",
  measurementId: "G-QVBSH67VLY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);