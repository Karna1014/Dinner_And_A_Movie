//$("#favListMovie").empty();
$.ajax({
    url: "/api/users/:user.id",
    method: "GET"
  }).then(function(res){
     for(i = 0; i < res.Movies.length; i++){
       var movieList = {
         genreName: Movies[i].genreName
       }
       $("<#movieList>").append(movieList.genreName);
     } 
    })

