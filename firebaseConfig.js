// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA1gyYT3z7FuHhDGh2cRvcUE6OGUXoablY",
  authDomain: "learnthat-217f4.firebaseapp.com",
  projectId: "learnthat-217f4",
  storageBucket: "learnthat-217f4.appspot.com",
  messagingSenderId: "608278789879",
  appId: "1:608278789879:web:dd56f39017be5d2e7d9df2",
  measurementId: "G-EKZN4B5LTF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);