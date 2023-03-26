const removeMovie = function(movieId) {
    movieList = movieList.filter(e => e != movieId)
    window.localStorage.setItem("movieId", JSON.stringify(movieList))
    displayMovies()
}

export default {removeMovie}
