// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC6hfQp3PUFd9LgXMWy5e5Cz6OApBH8KJk",
  authDomain: "coventen-9444b.firebaseapp.com",
  projectId: "coventen-9444b",
  storageBucket: "coventen-9444b.appspot.com",
  messagingSenderId: "713711069520",
  appId: "1:713711069520:web:d4c19ba419fdd8a9326455"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)