
const switchToSignup = document.getElementById('switchToSignup');
const switchToLogin = document.getElementById('switchToLogin');
const signupForm = document.getElementById('signupForm');
const loginForm = document.getElementById('loginForm');

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
