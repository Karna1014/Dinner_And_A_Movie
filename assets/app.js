$(document).on("click", "#movie-submit", function (e) {

    e.preventDefault();

    // API query constantants
    var movieAPIKey = "e703c9574a99f4f42772b7422d217e2e"; "6bd7be41a26f54fd1b16437cf9ecfe5a";
    var userMovies = [];

    // Variables for storing 3 movies from user.
    var movie1 = $("#movie-input1").val().trim();
    var movie2 = $("#movie-input2").val().trim();
    var movie3 = $("#movie-input3").val().trim();
    var selectedMovie;
    var selectedMovieID;

    //push movie input to movie array
    userMovies.push(movie1, movie2, movie3);

    //get random movie from array
    selectedMovie = Math.floor(Math.random() * (userMovies.length));

    var queryURL = "https://api.themoviedb.org/3/search/movie?api_key=" + movieAPIKey + "&language=en-US&query=" + userMovies[selectedMovie] + "&page=1&include_adult=false";
    var queryURL = "https://api.themoviedb.org/3/discover/movie?api_key=6bd7be41a26f54fd1b16437cf9ecfe5a&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_date.gte=1990-01-01&primary_release_date.lte=" + today + "&vote_average.gte=6&with_genres" + Genre;

    // AJAX call to movie database to get id of selectedMovie.
    if (userMovies[selectedMovie] !== "") {
    
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            // If first call is successful then make the second call
            if (response.total_results > 0) {
                
                selectedMovieID = response.results[0].id;

                var queryIDURL = "https://api.themoviedb.org/3/movie/" + selectedMovieID + "/recommendations?api_key=" + movieAPIKey + "&language=en-US&include_adult=false&include_video=false";

                // Ajax call to get the recommended movie.
                $.ajax({
                    url: queryIDURL,
                    method: "GET"
                }).then(function (response) {
                    if (response.total_results > 0) {
                        var randomResults = Math.floor(Math.random() * response.results.length);
                        var finalMovieSelection = (response.results[randomResults]);
                        var Genre = result.Genre;
                        var imgUrl = "https://image.tmdb.org/t/p/w200" + finalMovieSelection.poster_path;


                        currentPair.setCurrentMovie(
                            finalMovieSelection.original_title,
                            Genre,
                            imgUrl,
                            finalMovieSelection.overview,
                        );

                        // After movie has been selected, show user the results view.
                        $("#user-flow-background").load("results-load.html", function () {
                            renderResults();
                            renderUsername();
                        });

                    } else {
                        $("#error-text").text("We couldn't find any recommendations based on the movies provided. Please try again.");
                        $("#error").modal("show");
                    }
                });
            } else {
                $("#error-text").text("We didn't find a match for " + userMovies[selectedMovie] + ". Please check your spelling or enter a new movie.");
                $("#error").modal("show");
            }
        });
    // Error handling for when user forgets to enter movies.
    } else {
        $("#error-text").text("Please enter three movies before pressing submit.");
        $("#error").modal("show");
    }
});
