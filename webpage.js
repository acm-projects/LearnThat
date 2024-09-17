import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js';



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
  //const analytics = getAnalytics(app);


// Get elements
const loginForm = document.getElementById('loginForm');
const loginBtn = document.getElementById('loginBtn');
const signupForm = document.getElementById('signupForm');
const signupBtn = document.getElementById('signupBtn');

// Debugging statements
console.log("Popup script loaded");
const auth = getAuth();

//Handle creating users
signupBtn.addEventListener("click", function (event){
    event.preventDefault()
    const signupEmailField = document.getElementById('signupEmail').value;
    const signupPasswordField = document.getElementById('signupPassword').value;
createUserWithEmailAndPassword(auth, signupEmailField, signupPasswordField)
  .then((userCredential) => {
    // Signed up 
    event.preventDefault();
    const user = userCredential.user;
    alert("creating account")
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage)
    if (errorCode === 'auth/email-already-in-use') {
        alert("An account with this email already exists, please log in.");
      } else {
        // Handle other errors
        alert("Invalid credentials: " + errorMessage);
      }
    // ..
  });
})


//Handle log-ins
loginBtn.addEventListener("click", function (event){
event.preventDefault();
const emailField = document.getElementById('email').value;
const passwordField = document.getElementById('password').value;
signInWithEmailAndPassword(auth, emailField, passwordField)
  .then((userCredential) => {
    // Signed in 
    
    const user = userCredential.user;
    alert("signed in")
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage)
    if (errorCode != 'auth/email-already-in-use') {
        alert("This email does not exist, please sign up.");
      } else {
        // Handle other errors
        alert("Invalid credentials: " + errorMessage);
      }
  });
});
