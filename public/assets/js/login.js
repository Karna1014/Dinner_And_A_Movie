
// Get a reference to the database service
var database = firebase.database();



//sync Users
  exports.syncUsers = functions.database.ref('/Users/{userId}')
  .onWrite(event => {
	// Grab the current value of what was written to the Realtime Database.
	var userId = event.params.userId;
  var eventSnapshot = event.data;
	// Exit when the data is deleted.
	if (!event.data.exists()) {
	  	console.log("DELETE User by Id:" + userId);
		var DELETE_USER_SQL = "DELETE FROM `Users` where `userId` = ?";
		var params = [
			userId
		];
		var connection;
		return mysql.createConnection(dbconfig).then(function(conn){
			connection = conn;
			return connection.query(DELETE_USER_SQL, params);
		})
 
	}
	console.log("INSERT/UPDATE User by userId:" + userId);
	var INSERT_USER_SQL = "INSERT INTO `Users` (`email`, `displayName`) VALUES (?, ?)";
	var params = [
		userId,
		eventSnapshot.child("id") ? eventSnapshot.child("id").val() : null,
		eventSnapshot.child("displayName") ? 	eventSnapshot.child("displayName").val() : null,
		eventSnapshot.child("email") ? eventSnapshot.child("email").val() : null
	];
	return mysql.createConnection(dbconfig).then(function(conn){
		connection = conn;
		return connection.query(INSERT_USER_SQL, params);
	});
});


if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
  
  var email = window.localStorage.getItem('emailForSignIn');
  if (!email) {
    // User opened the link on a different device. To prevent session fixation
    // attacks, ask the user to provide the associated email again. For example:
    email = window.prompt('Please provide your email for confirmation');
  }
  // The client SDK will parse the code from the link for you.
  firebase.auth().signInWithEmailLink(email, window.location.href)
    .then(function(result) {
      // Clear email from storage.
      window.localStorage.removeItem('emailForSignIn');
      // You can access the new user via result.user
      // Additional user info profile not available via:
      // result.additionalUserInfo.profile == null
      // You can check if the user is new or existing:
      // result.additionalUserInfo.isNewUser
    })
    .catch(function(error) {
      // Some error occurred, you can inspect the code: error.code
      // Common errors could be invalid email and invalid or expired OTPs.
    });
  }
// $("#pswdReset").on("click", function (event) {
//   event.preventDefault;
//   var userInfo = {
//       email: $("#email").val().trim(),
//       pswd: $("#pswd").val().trim()
//   }
//   $.ajax({
//       url: "/login",
//       method: "POST",
//       data: userInfo
//   })
//       .then(function (res) {
//           console.log(res);

//       })
// })
// $("#emailUpdate").on("click", function (event) {
//   event.preventDefault;
//   var userInfo = {
//       email: $("#email").val().trim(),
//       pswd: $("#pswd").val().trim()
  // }

// function badEmail() {
//   if (email !== "verifiedEmail")
//   throw(badEmailMsg);
// };

// var badEmailMsg = "Your emails don't match, please try again!"
  
