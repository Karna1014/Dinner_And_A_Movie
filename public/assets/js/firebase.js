
var firebaseConfig = {
    apiKey: "AIzaSyBOmny4mwrBq_uySxdWhy22Rfk1ax5uDB4",
    authDomain: "dinner-70925.firebaseapp.com",
    databaseURL: "https://dinner-70925.firebaseio.com",
    projectId: "dinner-70925",
    storageBucket: "dinner-70925.appspot.com",
    messagingSenderId: "81278181735",
    appId: "1:81278181735:web:e6441bc700eae6f17c8fc2",
    measurementId: "G-7N41FQGW63"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var email = "test@test.com";
var password = "password";
function signup(email, password) {
    console.log(email);
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
// Handle Errors here.
var errorCode = error.code;
var errorMessage = error.message;
// ...
});
}
signup(email, password);
