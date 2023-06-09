
const searchBtn = document.getElementById("search-button")
const movieCnt = document.getElementById("movie-container")

let myWatchlist = JSON.parse(window.localStorage.getItem("movieId")) ? JSON.parse(window.localStorage.getItem("movieId")) : []

function addToWatchlist(movieId) {
    myWatchlist.push(movieId)
    window.localStorage.setItem("movieId", JSON.stringify(myWatchlist))
    
    document.getElementById(movieId+"-button").innerHTML = `
        <button class="movie-btn movie-details" onclick="window.removeMovie('${movieId}')" >
            <img src="./img/minusIcon.png"> Remove
        </button>`
}



function removeMovie(movieId) {
    myWatchlist = myWatchlist.filter(e => e != movieId)
    window.localStorage.setItem("movieId", JSON.stringify(myWatchlist))
    
    document.getElementById(movieId+"-button").innerHTML = `
        <button class="movie-btn movie-details" onclick="addToWatchlist('${movieId}')" >
            <img src="./img/plusIcon.png"> Watchlist
        </button>`
}

function checkIfAdded(movie) {
    if(myWatchlist.includes(movie.imdbID)) {
        return `
            <button class="movie-btn movie-details" onclick="window.removeMovie('${movie.imdbID}')" >
                <img src="./img/minusIcon.png"> Remove
             </button>`
    } else {
        return `
            <button class="movie-btn movie-details" onclick="addToWatchlist('${movie.imdbID}')" >
                <img src="./img/plusIcon.png"> Watchlist
            </button>`
    }
}

function getMovieHtml(movie) {
    const moviePoster = movie.Poster != "N/A" ? `<img src=${movie.Poster} alt="Poster of the movie" class="movie-poster">` : ""

    return (`
        <div class="movie-cont" id=${movie.imdbID}>
            ${moviePoster}
            <div class="movie-text">
                <div class="movie-line">
                    <h3>${movie.Title}</h3>
                    <div class="movie-details"> ⭐️ ${movie.imdbRating}</div>
                </div>
                <div class="movie-line" >
                    <div class="movie-details">${movie.Runtime}</div>  
                    <div class="movie-details">${movie.Genre} </div> 
                    <div class="movie-details" id="${movie.imdbID}-button"> ${checkIfAdded(movie)}</div>
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
                
                let searchResult = data.Search.filter(entry => entry.Type== "movie").map(m => m.imdbID)
                movieCnt.innerHTML = ""
                searchResult.map(id => fetchMovie(id))
            }
        })
})