
let movies = [];

    if(localStorage.getItem("movies")!==null){

      movies=JSON.parse(localStorage.getItem("movies"));
    }
    else{
      localStorage.setItem("movies",JSON.stringify(movies));
    }




// -----------------------------------------FUNCTION TO GENERATE HTML-------------------------------------------------

function homepageDisplay(arr){

    document.getElementById("movie-list").innerHTML="";

    arr.forEach((movie, index) => {
        
        let movieFrameDiv=document.createElement("div");
        movieFrameDiv.className="test_container";

          let movie_card_holder=document.createElement("div");
          movie_card_holder.className="test_card";
          movieFrameDiv.appendChild(movie_card_holder); 

            let movieImageHolder=document.createElement("div");
            movieImageHolder.className="img_holder";
            movie_card_holder.appendChild(movieImageHolder); 

              let movieImage=document.createElement("img");
              movieImage.src=movie.posterurl;
              movieImage.alt="movie-poster";
              movieImageHolder.appendChild(movieImage);

            let movieContentHolder=document.createElement("div");
            movieContentHolder.className="content_holder";
            movie_card_holder.appendChild(movieContentHolder); 

              let movieTitleContainer=document.createElement("div");
              movieTitleContainer.className="movie_title";
              movieContentHolder.appendChild(movieTitleContainer);

                let movieTitle= document.createElement("h3");
                movieTitle.className= "title";
                movieTitle.innerText="Title:"+ movie.title;
                movieTitleContainer.appendChild(movieTitle);

                let genresDetails= document.createElement("div");
                genresDetails.className= "genres";
                genresDetails.innerText="Genres:" +movie.genres;
                movieTitleContainer.appendChild(genresDetails);

              
              let movieStoryContainer=document.createElement("div");
              movieStoryContainer.className="movie_storyline";
              movieStoryContainer.innerText=movie.storyline;
              movieContentHolder.appendChild(movieStoryContainer);


              let movieActionContainer=document.createElement("div");
              movieActionContainer.className="movie_actions";
              movieContentHolder.append(movieActionContainer);
          
                let ratingContainer=document.createElement("div");
                ratingContainer.className="rating";
                movieActionContainer.append(ratingContainer);

                let ratingText=document.createElement("p");
                ratingText.innerText="Ratings: ";
                ratingContainer.appendChild(ratingText);

                let ratingIcon=document.createElement("i");
                ratingIcon.className="fa-regular";
                ratingIcon.className="far fa-star";
                ratingContainer.appendChild(ratingIcon);

                let durationContainer=document.createElement("div");
                durationContainer.className="duration";
                movieActionContainer.append(durationContainer);

                let durationText=document.createElement("p");
                durationText.innerHTML="Duration: "+movie.duration+" min" ;
                durationContainer.appendChild(durationText);

        document.querySelector("#movie-list").appendChild(movieFrameDiv); 
        
    });
}

homepageDisplay(movies);