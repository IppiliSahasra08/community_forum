// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDvRet9_Br_NuoS-VCaeohks5QsFrhOezE",
  authDomain: "community-forum-28b6b.firebaseapp.com",
  projectId: "community-forum-28b6b",
  storageBucket: "community-forum-28b6b.firebasestorage.app",
  messagingSenderId: "978020021806",
  appId: "1:978020021806:web:00d4d1126bd87c717c11bf",
  measurementId: "G-19KSKZEPZV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);