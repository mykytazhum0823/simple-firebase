const db = firebase.firestore();

const collection_user = "users";
const collection_membership = "memberships";
const collection_gym = "gyms";
const collection_class = "classes";
const collection_attendance = "attendance";

const initApp = () => {
  // Listening for auth state changes.
  firebase.auth().onAuthStateChanged(function(user) {
    
    if (user) {
      // User is signed in.

    } else {
      // User is signed out.

    }
  });
}

const handleSignUp = (email, password) => {
  if (email.length < 4) {
    alert('Please enter an email address.');
    return;
  }
  if (password.length < 4) {
    alert('Please enter a password.');
    return;
  }
  // Create user with email and pass.
  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    if (errorCode == 'auth/weak-password') {
      alert('The password is too weak.');
    } else {
      alert(errorMessage);
    }
    console.log(error);
  });
}
