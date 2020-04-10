
// const firebase = require("firebase");
// const fbApp = require("../../../config/fb-config");

// firebase.auth().onAuthStateChanged(function(user) {
//    console.log(user);
//   });


// firebase.auth().defaultAuth.createUser({
//   email: "user#example.com",
//   password: "secretPassword",
//   displayName: req.body.username,
//   }) 
//   .then(function(userRecord){
//     // A UserRecord representation of the newly created user is returned
// console.log("Successfully created new user:", userRecord.uid);
//   })

function badEmail() {
  if (email !== "verifiedEmail")
  throw(badEmailMsg);
};

var badEmailMsg = "Your emails don't match, please try again!"
  
