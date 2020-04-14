

$("#login").on("click", function (event) {
    event.preventDefault();
    var userInfo = {
        email: $("#email").val().trim(),
        pswd: $("#pswd").val().trim()
    }
     $.ajax({
         url: "/api/authenticate",
         method: "POST",
         data: userInfo
     })
    
     .then(function (res) {
         if (res.loggedInUser) {
             if (localStorage.getItem("loggedInUser")) {
                 localStorage.removeItem("loggedInUser");
             }

             if (localStorage.getItem("loggedInUserId")) {
                 localStorage.removeItem("loggedInUserId");
             }

             if (res.loggedInUser != null) {
                localStorage.setItem("loggedInUser", res.loggedInUser);
             }

             if (res.loggedInUserId != null) {
                localStorage.setItem("loggedInUserId", res.loggedInUserId);
             }
         }
         
        if (res.loggedIn) {
                   window.location.href="/movie-dinner"
         } else {
             $("#loginError").css("display", "block");
         }
         });
});