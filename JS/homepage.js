
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

                let StarHolder=document.createElement("div");
                StarHolder.className="whiteYellowStars";
                ratingContainer.appendChild(StarHolder);

                let WhiteStarHolder=document.createElement("div");
                WhiteStarHolder.className="White_star_holder";
                StarHolder.appendChild(WhiteStarHolder);

                for(n=1 ;n<=5;n++){
                
                  let ratingIcon=document.createElement("i");
                  ratingIcon.className="fa-solid fa-star";
                  WhiteStarHolder.appendChild(ratingIcon);
                }

                let YellowStarMainHolder=document.createElement("div");
                YellowStarMainHolder.className="Yellow_star_main_holder";
                StarHolder.appendChild(YellowStarMainHolder);

                let YellowStarHolder=document.createElement("div");
                YellowStarHolder.className="Yellow_star_holder";
                YellowStarMainHolder.appendChild(YellowStarHolder);

                for(n=1 ;n<=5;n++){
                
                  let ratingIcon=document.createElement("i");
                  ratingIcon.className="fa-solid fa-star";
                  ratingIcon.style.color='gold';
                  YellowStarHolder.appendChild(ratingIcon);
                }

                let displayRating=document.createElement("span");
                if(movie.ratings.length===0){

                  displayRating.innerText='(0)';
                  ratingContainer.appendChild(displayRating);
                }
                else{

                  let avgrating=avgRating(movie.ratings)
                  displayRating.innerHTML=`(${avgrating.toFixed(1)})`;
                  YellowStarMainHolder.style.width=avgrating*20+'%';
                  ratingContainer.appendChild(displayRating);
                }

                let durationContainer=document.createElement("div");
                durationContainer.className="duration";
                movieActionContainer.append(durationContainer);

                let durationText=document.createElement("p");
                durationText.innerHTML="Duration: "+movie.duration+" min" ;
                durationContainer.appendChild(durationText);

                let submitRatingContainer=document.createElement("div");
                movieActionContainer.append(submitRatingContainer);

                let submitRatingButton=document.createElement("button");
                submitRatingButton.type="button";
                submitRatingButton.innerText= "Add Rating";
                submitRatingButton.className="SubmitRatingBtn";
                submitRatingButton.onclick=function(){

                  openWin();
                  selectedMovieID=movie;

                };
                submitRatingContainer.appendChild(submitRatingButton);

        document.querySelector("#movie-list").appendChild(movieFrameDiv); 
        
    });
}

homepageDisplay(movies);

// ------------------------FUNCTION TO OPRN/CLOSE WINDOW---------------------------------


function closewin(modeel){

  document.getElementById(modeel).style.display="none";  

} 

function openWin(){
  document.getElementById("rating_preview").style.display="flex";

}

let starStatus=false;

let selectedMovieID=null;

let rating=null;

function rateStar(event){


let selectedStar= event.target.getAttribute("val-star");

  let stars=document.getElementsByClassName("rate_star");

  for(n=0;n<=selectedStar;n++){
                  
    stars[n].style.color="gold";
  }

}

function selectedStar(event){

  if(starStatus===true){

    starStatus=false;
    removeRateColor();
  }

  starStatus=true;

  rating=event.target.getAttribute("val-star");

  let stars=document.getElementsByClassName("rate_star");

  for(n=0;n<=rating;n++){
                  
    stars[n].style.color="gold";
  }

}


function removeRateColor(){

  if(starStatus===false){

    let stars=document.getElementsByClassName("rate_star");
    for(n=0;n<=4;n++){
      stars[n].style.color="rgb(132, 132, 132)";
    }
  }

}


function updateRatingDB(){

  console.log(selectedMovieID);
  selectedMovieID.ratings.push(Number(rating));
  localStorage.setItem("movies",JSON.stringify(movies));
}


function avgRating(arr){

  let sum=0;

  arr.forEach((num, index)=>{

    sum+=num;
  })

  return  (sum/arr.length);
}

