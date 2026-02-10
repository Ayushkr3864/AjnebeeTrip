import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAF5pZ47jcWi5pdLNA6YxGMVh1L78fMaAc",
  authDomain: "ajnaabee-trip.firebaseapp.com",
  projectId: "ajnaabee-trip",
  storageBucket: "ajnaabee-trip.appshot.com",
  messagingSenderId: "1066804151079",
  appId: "1:1066804151079:web:21de5dc2f4574c953c9f02",
  measurementId: "G-3VPSF282YF",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
