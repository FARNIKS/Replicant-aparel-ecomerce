// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBHN_vq9fE5rHDhAsRVdKCf5WcQVv6hMkk",
  authDomain: "e-commerce-stripe-814f8.firebaseapp.com",
  projectId: "e-commerce-stripe-814f8",
  storageBucket: "e-commerce-stripe-814f8.firebasestorage.app",
  messagingSenderId: "661511768946",
  appId: "1:661511768946:web:36f8738eee725021456beb",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

export default app;
