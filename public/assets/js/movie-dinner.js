

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
          })

          
//---------- Information for recipe calls and routes-------

var cardCount=1;
var hr = $('<hr id="line">');
// On click function that will trigger the AJAX call to get recipes.
$("#find-recipe").on("click", function(event) {
    event.preventDefault();
          $("#recipe-view").empty();
            var header =  "https://cors-anywhere.herokuapp.com/https://recipe-puppy.p.rapidapi.com/?p=1&i="
            var i= $("#recipe-input").val().trim();
            var apikey = "&rapidapi-key=ff64e275a8msh9216be6b0ceb78cp10beb1jsn4c098d509ff7"
            var queryURLdin = header + i + apikey
              console.log(queryURLdin)
  // AJAX call with parsed responses.
            $.ajax({
                url: queryURLdin,
                method: "GET" 
            }).done(function(response){
                console.log(response);
                var res = JSON.parse(response);
                res.results.forEach(function(item) {
                  console.log(item);
                  let i = cardCount;

  // HTML Elements to dynamically populate to page with items from the AJAX call.
                      var recipeName = $('<h2 id="name" align="center">').text(item.title);
                      var recipeURL = $('<a id="atag">').attr("href", item.href).append(recipeName);
                      var ingred = $('<h4 id="ingred" align="center">').text("Main Ingredients: " + item.ingredients);
                      var image = $('<img id="image" align="middle">').attr("src", item.thumbnail);
                      var hr = $('<hr id="line">');
                      // var btnSave = $('<input type="button" class="btnSave" name="btnSave" value="Saved Recipes">').addClass("btn btn-primary btn-lg").attr('id', cardCount++);
  // Appending all the information to the HTML file. 
                      $("#recipe-view").append(image, recipeURL, ingred, hr);
                      
                        // $(document).on('click', 'input', function() {saveThis(item.title, item.href)});
                    })
                }) 
                })
          
                // function saveThis(title, href) {
                //       // event.preventDefault();
                //       $("#saved-recipes").append(title, ": ", href, " | | ");
                //       console.log(title, ": ", href);
            
                //     }    
