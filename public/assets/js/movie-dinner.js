

            var queryURL = "https://api.themoviedb.org/3/genre/movie/list?api_key=3d866c05691ba06f9fa697f8e8c9e838&language=en-US";
      
            $.ajax({
              url: queryURL,
              method: "GET"
            }).done(function(response) {
              var genres = response.genres;
              for (i = 0; i < genres.length; i++) {
    
                  $('select').append(
    
                    "<option value='" + genres[i].id + "'>" + genres[i].name + "</option>"
                  );
              };
              });
    
        
        var queryLimit = 8;
        var today = moment().format('YYYY-MM-DD');
    
      //call movie api
        $('#search').click(function(){
          event.preventDefault();
            $('#movieList').empty();
            var genreId = $('select').val();
    
          var queryURL = "https://api.themoviedb.org/3/discover/movie?api_key=3d866c05691ba06f9fa697f8e8c9e838&language=en-US&region=US&sort_by=release_date.asc&include_video=false&page=1&primary_release_date.gte=" + today + "&with_genres=" + genreId;
    
          $.ajax({
              url: queryURL,
              method: "GET"
            }).done(function(response) {
              var movies = response.results; 
    
              for (i = 0; i < movies.length; i++) {
    
                var posterURL = "https://image.tmdb.org/t/p/w500/" + movies[i].poster_path;
    
                  $('#movieList').append(
    
                    "<ul style='list-style-type: none'><li>Movie ID: " +
                    movies[i].id + "</li><li>Movie Title: " +
                    movies[i].title + "</li><li>Release Date: " +
                    movies[i].release_date + "</li><li> <img style='width: 300px; height: auto' src='" +
                    posterURL + "'></li><li>Overview:<br>" +
                    movies[i].overview + "</li></ul><hr>"
    
                  );
              };
              });
        });
          
    //posting Movie data to backend
          $("#saveGenre").on("click", function(event){
          event.preventDefault();
          var genreId = $('select').val().trim();
          console.log(genreId);
          var genreName = $('select option:selected').text().trim();

          var Movie = {
              genreId: genreId,
              genreName: genreName,
              userId: localStorage.getItem("loggedInUserId")
          }

          console.log(Movie);

          $.ajax({
              url: "/movie-dinner",
              method: "POST",
              data: Movie
          }).then(function(res){
             res.send();
            }); 




 $(document).on('click','li',function(){
      var id = $(this).data("id");
      var newMovie = $(this).data(movies[i].title);

      console.log(id, newMovie);
  
      var newDevourState = {
        devoured: newDevoured
      };
  
      // Send the PUT request.
      $.ajax("/api/burgers/" + id, {
        type: "PUT",
        data: newDevourState
      }).then(
        function() {
          console.log("changed devour to", newDevoured);
          // Reload the page to get the updated list
          location.reload();
        }
      );
    });
  
    
  
    $(".delete-burger").on("click", function(event) {
      var id = $(this).data("id");
        console.log(id);
      // Send the DELETE request.
      $.ajax("/api/burgers/" + id, {
        type: "DELETE"
      }).then(
        function() {
          console.log("deleted burger", id);
          // Reload the page to get the updated list
          location.reload();
        }
      );
    });
  });