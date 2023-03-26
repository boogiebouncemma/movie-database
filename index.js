const searchBtn = document.getElementById("search-button")
const movieCnt = document.getElementById("movie-container")
// window.localStorage.clear()
// window.localStorage.setItem("movieId", JSON.stringify([]))
// window.localStorage.getItem("movieId")
// let myWatchlist = []

function addToWatchlist(movie) {
    // myWatchlist.push(movie)
    let myWatchlist = JSON.parse(window.localStorage.getItem("movieId")) ? JSON.parse(window.localStorage.getItem("movieId")) : []
    myWatchlist.push(movie)
    // console.log(myWatchlist)
    window.localStorage.setItem("movieId", JSON.stringify(myWatchlist))
    // console.log(window.localStorage.getItem("movieId"))
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
                        onclick="addToWatchlist('${movie.imdbID}')"
                    >
                        <img src="./img/plusIcon.png"> Watchlist
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
            movieCnt.innerHTML += getMovieHtml(searchOutput)
            document.getElementById("search-box").value = ""
        })
}

searchBtn.addEventListener("click", (e) => {
    e.preventDefault()
    let searchValue = document.getElementById("search-box").value

    fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=55634f5e`)
        .then(res => res.json())
        .then(data => {
            if (data.Response == "False") {
                movieCnt.innerHTML = `
                    <div class="not-found">Unable to find what you’re looking for.<br> Please try another search.</div>`
            } else {
                // console.log(data)
                let searchResult = data.Search.filter(entry => entry.Type== "movie").map(m => m.imdbID)
                movieCnt.innerHTML = ""
                searchResult.map(id => fetchMovie(id))
            }
        })
})