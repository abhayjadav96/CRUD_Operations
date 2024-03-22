
let movies = [];

    if(localStorage.getItem("movies")!==null){

      movies=JSON.parse(localStorage.getItem("movies"));
    }
    else{
      localStorage.setItem("movies",JSON.stringify(movies));
    }




// -----------------------------------------FUNCTION TO GENERATE HTML-------------------------------------------------

function homepageDisplay(arr){

    document.querySelector("#movie-list").innerHTML="";

    arr.forEach((movie, index) => {
        
        let movieFrameDiv=document.createElement("div");
        movieFrameDiv.className="movie_frame_holder";

        let moviePoster=document.createElement("div");
        moviePoster.className="movie_poster_holder"

        let movieurl=document.createElement("img");
        movieurl.src=movie.posterurl;
        moviePoster.appendChild(movieurl);
        movieurl.style.height= "45vh";
        movieurl.style.width="100%";
        movieurl.style.objectFit="cover";

        let movieTitle= document.createElement("div");
        movieTitle.className= "movie_title_holder";
        movieTitle.append(movie.title);

        movieFrameDiv.appendChild(moviePoster);
        movieFrameDiv.appendChild(movieTitle);

        document.querySelector("#movie-list").appendChild(movieFrameDiv); 
        
    });
}

homepageDisplay(movies);