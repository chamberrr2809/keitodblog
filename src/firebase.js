import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBfD4j1v66yGehobb-JKmQVOuRhjDQjFTA",
  authDomain: "keitod-blog.firebaseapp.com",
  projectId: "keitod-blog",
  storageBucket: "keitod-blog.appspot.com",
  messagingSenderId: "211481019633",
  appId: "1:211481019633:web:ae758b3b89b7ca0cffd550",
  measurementId: "G-3C2008CP6Z",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
export default db;
export { auth };
