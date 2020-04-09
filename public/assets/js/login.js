$("#enroll").on("click", function(event) {
    

    // Send the PUT request.
    $.ajax("/login", {
    type: "POST",
    data: Login
    }).then(
    function() {
        window.location.replace("http:localhost:8080/signup");
        // Reload the page to get the updated list
    
    }
    );
});


$("#login").on("click", function(event) {
    var email = $("#Email").val();
    var password = $("#pswd").val();

    console.log(email, password);

    var Login = {
    email: email,
    password: password
    };

    // Send the PUT request.
    $.ajax("/login", {
    type: "POST",
    data: Login
    }).then(
    function() {
        window.location.replace("http:localhost:8080/dinner");
        // Reload the page to get the updated list
    
    }
    );
});
  
    
  
    