import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC3ypVnYXDbGDqTeNatdIHCn59BSPE5Jc0",
  authDomain: "ajnabee-trip.firebaseapp.com",
  projectId: "ajnabee-trip",
  storageBucket: "ajnabee-trip.firebasestorage.app",
  messagingSenderId: "213731181811",
  appId: "1:213731181811:web:0952da2d5571fd59376386",
  measurementId: "G-EB7GSXB97F",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
