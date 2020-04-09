

var firebaseConfig = {
    apiKey: process.env,API_KEY,
    authDomain: "dinner-70925.firebaseapp.com",
    databaseURL: "https://dinner-70925.firebaseio.com",
    projectId: "dinner-70925",
    storageBucket: "dinner-70925.appspot.com",
    messagingSenderId: "81278181735",
    appId: "1:81278181735:web:e6441bc700eae6f17c8fc2",
    measurementId: "G-7N41FQGW63"
};

firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged(function(user) {
   console.log(user);
  });

console.log("login-js");
// $("#enroll").on("click", function(event) {
    

//     // Send the PUT request.
//     $.ajax("/login", {
//     type: "POST",
//     data: Login
//     }).then(
//     function() {
//         window.location.replace("http:localhost:8080/signup");
//         // Reload the page to get the updated list
    
//     }
//     );
// });


// $("#login").on("click", function(event) {
//     var email = $("#Email").val();
//     var password = $("#pswd").val();

//     console.log(email, password);

//     var Login = {
//     email: email,
//     password: password
//     };

//     // Send the PUT request.
//     $.ajax("/login", {
//     type: "POST",
//     data: Login
//     }).then(
//     function() {
//         window.location.replace("http:localhost:8080/dinner");
//         // Reload the page to get the updated list
    
//     }
//     );
// });
  
    
  
    