import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyDMrV5bSBd5Xg_aTqM4608LmJkxnmMDiPw",
  authDomain: "https://ecommerce-fd3af-default-rtdb.firebaseio.com/",
  projectId: "ecommerce-fd3af",
  storageBucket: "ecommerce-fd3af.appspot.com",
  messagingSenderId: "989393929451",
  appId: "1:989393929451:android:757f6567607c2a65d6eaae"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
