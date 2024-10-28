//No code in here for now
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is logged in
      console.log("User logged in from extension:", user.email);
    } else {
      // No user is logged in
      console.log("No user logged in");
    }
  });
  
