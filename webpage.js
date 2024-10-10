import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js';



  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: API_KEY,
    authDomain: AUTH_DOMAIN,
    projectId: PROJECT_ID,
    storageBucket: STORAGE_BUCKET,
    messagingSenderId: MESSAGING_ID,
    appId: APP_ID,
    measurementId: MEASUREMENT_ID
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
