// Import Firebase functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-auth.js";

// Firebase configuration
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
const auth = getAuth(app);

// Get elements
const loginForm = document.getElementById('loginForm');
const emailField = document.getElementById('email');
const passwordField = document.getElementById('password');
const loginBtn = document.getElementById('loginBtn');

const signupForm = document.getElementById('signupForm');
const signupEmailField = document.getElementById('signupEmail');
const signupPasswordField = document.getElementById('signupPassword');
const signupBtn = document.getElementById('signupBtn');

const switchToSignup = document.getElementById('switchToSignup');
const switchToLogin = document.getElementById('switchToLogin');

const logoutBtn = document.getElementById('logoutBtn');
const status = document.getElementById('status');

// Debugging statements
console.log("Popup script loaded");

// Handle switching to sign-up form
if (switchToSignup) {
    switchToSignup.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('Switching to Sign-Up form');
        loginForm.classList.add('hidden');
        signupForm.classList.remove('hidden');
    });
}

// Handle switching to login form
if (switchToLogin) {
    switchToLogin.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('Switching to Login form');
        signupForm.classList.add('hidden');
        loginForm.classList.remove('hidden');
    });
}

// Handle login
if (document.getElementById('loginFormElement')) {
    document.getElementById('loginFormElement').addEventListener('submit', async (e) => {
        e.preventDefault();
        console.log('Login form submitted');
        const email = emailField.value;
        const password = passwordField.value;
        
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            status.textContent = `Signed in as: ${user.email}`;
            loginForm.classList.add('hidden');
            logoutBtn.classList.remove('hidden');
        } catch (error) {
            console.error("Login error:", error);
            status.textContent = 'Login failed: ' + error.message;
        }
    });
}

// Handle sign-up
if (document.getElementById('signupFormElement')) {
    document.getElementById('signupFormElement').addEventListener('submit', async (e) => {
        e.preventDefault();
        console.log('Sign-up form submitted');
        const email = signupEmailField.value;
        const password = signupPasswordField.value;

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            status.textContent = `Account created for: ${user.email}`;
            signupForm.classList.add('hidden');
            logoutBtn.classList.remove('hidden');
        } catch (error) {
            console.error("Sign-up error:", error);
            status.textContent = 'Sign-up failed: ' + error.message;
        }
    });
}

// Handle logout
if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
        console.log('Logout button clicked');
        try {
            await signOut(auth);
            status.textContent = 'Not signed in';
            loginForm.classList.remove('hidden');
            signupForm.classList.add('hidden');
            logoutBtn.classList.add('hidden');
        } catch (error) {
            console.error("Logout error:", error);
        }
    });
}

// Check authentication state
onAuthStateChanged(auth, (user) => {
    if (user) {
        status.textContent = `Signed in as: ${user.email}`;
        loginForm.classList.add('hidden');
        signupForm.classList.add('hidden');
        logoutBtn.classList.remove('hidden');
    } else {
        status.textContent = 'Not signed in';
        loginForm.classList.remove('hidden');
        signupForm.classList.add('hidden');
        logoutBtn.classList.add('hidden');
    }
});
