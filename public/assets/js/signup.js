

$("#submit").on("click", function (event) {
    event.preventDefault();

    if ($("#registerEmail").val().trim() != $("#emailVerified").val().trim()) {
        $("#emailError").css("display", "block");
    } else {
        var userInfo = {
            displayName: $("#displayName").val().trim(),
            email: $("#registerEmail").val().trim(),
            pswd: $("#registerPswd").val().trim()
        }
        console.log(userInfo);
        $.ajax({
            url: "/signup",
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
            window.location.href="/";
        });
    }
});