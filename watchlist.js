const watchlistCnt = document.getElementById("watchlist-container")

let movieList = JSON.parse(window.localStorage.getItem("movieId"))

function removeMovie(movieId) {
    movieList = movieList.filter(e => e != movieId)
    window.localStorage.setItem("movieId", JSON.stringify(movieList))
    displayMovies()
}

function getMovieHtml(movie) {
    const moviePoster = movie.Poster != "N/A" ? `<img src=${movie.Poster} alt="Poster of the movie" class="movie-poster">` : ""

    return (`<div class="movie-cont">
            ${moviePoster}
            <div class="movie-text">
                <div class="movie-line">
                    <h3>${movie.Title}</h3>
                    <div class="movie-details"> ⭐️ ${movie.imdbRating}</div>
                </div>
                <div class="movie-line">
                    <div class="movie-details">${movie.Runtime}</div>  
                    <div class="movie-details">${movie.Genre} </div> 
                    <button 
                        class="movie-btn movie-details" 
                        onclick="removeMovie('${movie.imdbID}')"
                    >
                        <img src="./img/minusIcon.png"> Remove
                    </button>
                </div>
                <div class="movie-description movie-line"> ${movie.Plot}</div>
            </div>
        </div>
        <hr>     
    `)
}

function fetchMovie(id) {
    fetch(`https://www.omdbapi.com/?i=${id}&apikey=55634f5e`)
        .then(res => res.json())
        .then(data => {
            let searchOutput = data
            watchlistCnt.innerHTML += getMovieHtml(searchOutput)
        })
}

function displayMovies() {
    if (!movieList || movieList.length == 0) {
        watchlistCnt.innerHTML = `     
        <div class="empty-watchlist">
            <div>Your watchlist is looking a little empty...</div>
            <a href="index.html">
                <img src="./img/plusIcon.png"> Let's add some movies!
            </a>
        </div>`

    } else {
        watchlistCnt.innerHTML = movieList.map(movie => fetchMovie(movie)).join("")
    }
}


displayMovies()
