



//posting Movie data to backend
$("#saveGenre").on("click", function (event) {
  event.preventDefault();
  var genreId = $("select").val().trim();
  console.log(genreId);
  var genreName = $("select option:selected").text().trim();

  var Movie = {
    genreId: genreId,
    genreName: genreName,
    userId: localStorage.getItem("loggedInUserId"),
  };

  console.log(Movie);

  $.ajax({
    url: "/movie-dinner",
    method: "POST",
    data: Movie,
  }).then(function (res) {
    res.send();
  });
});

