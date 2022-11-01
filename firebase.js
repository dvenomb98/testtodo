import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCmthQ2bFNnya7o8C5Zm0suYegyDDGQnx8",
    authDomain: "todoapp-93f81.firebaseapp.com",
    projectId: "todoapp-93f81",
    storageBucket: "todoapp-93f81.appspot.com",
    messagingSenderId: "611302886868",
    appId: "1:611302886868:web:364f9c910c70a4ab5d5a41"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app)
export const storage = getStorage(app);
export default app