import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js';



  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional ya
  const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: import.meta.env.VITE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_MESSAGING_ID,
    appId: import.meta.env.VITE_APP_ID,
    measurementId: import.meta.env.VITE_MEASUREMENT_ID,
  };
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  //const analytics = getAnalytics(app);
 const auth = getAuth(app);
  
  
  
  export function signUp ( email, password, onSuccess){      
      createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
          // Signed up         
          const user = userCredential.user;
          alert("creating account")
          onSuccess();
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
  }
  
  
  //Handle log-ins
  export function logIn (email, password, onSuccess){      
      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
          // Signed in 
          
          const user = userCredential.user;
          alert("signed in")
          onSuccess();
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
  }
  
  onAuthStateChanged(auth, (user) => {
    if (user) {
        // User logged in already or has just logged in.
        console.log("User UID: " + user.uid); // Log the UID
        // Optionally, you can update the UI or take other actions here.
    } else {
        // User not logged in or has just logged out.
        console.log("No user is logged in.");
    }
  });
  
  