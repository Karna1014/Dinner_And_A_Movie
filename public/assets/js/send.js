
    $("#submit").on("click", function(event){
        event.preventDefault();
        $.ajax({
            url:"/send",
            method: "POST",
            data: $("#email").val().trim()
        }).then(function(res){
            res.send();
        })
    })
