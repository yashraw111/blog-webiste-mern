import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getEvn } from "./getEnv";

const firebaseConfig = {
  apiKey: getEvn("VITE_FIREBASE_API"),
  authDomain: "mern-blog-pr.firebaseapp.com",
  projectId: "mern-blog-pr",
  storageBucket: "mern-blog-pr.firebasestorage.app",
  messagingSenderId: "900243547633",
  appId: "1:900243547633:web:dd7ea02f54d7be20105050"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export {auth,provider}