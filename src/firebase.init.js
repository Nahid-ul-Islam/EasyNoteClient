// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyATbJD-QmGDbxlBtFhSllsVkaqWzWbbZ8g",
  authDomain: "easy-notes-f6286.firebaseapp.com",
  projectId: "easy-notes-f6286",
  storageBucket: "easy-notes-f6286.appspot.com",
  messagingSenderId: "355550800319",
  appId: "1:355550800319:web:a0ed37770a6d6a4ff2d90a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;