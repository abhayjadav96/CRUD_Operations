
let movies = [];

    if(localStorage.getItem("movies")!==null){

      movies=JSON.parse(localStorage.getItem("movies"));
    }
    else{
      localStorage.setItem("movies",JSON.stringify(movies));
    }

// ----------------------------------------GLOBAL VARIABLES----------------------------------------------------------

let totalpage=Math.ceil(movies.length/10);
totalpage=document.getElementById("totalPages").innerText=totalpage;

let start=0;

let slicedData=movies.slice(start,start+10);
displaydata(slicedData);


// -----------------------------------------------FUNCTION TO CREATE TABLE----------------------------------------------

function displaydata(movieArr){

  document.getElementById("movie_display").innerHTML="";

  let serial=start+1;
  console.log(serial);

  movieArr.forEach((movie,index) => {

    let row=document.createElement("tr");

    let indexTD=document.createElement("td");
    indexTD.append(serial);
    serial++;

    row.appendChild(indexTD);

    let titleTD=document.createElement("td");
    titleTD.append(movie.title); 
    row.appendChild(titleTD);
    
    let releaseTD=document.createElement("td");
    releaseTD.append(movie.releaseDate);
    row.appendChild(releaseTD);

    let genresTD=document.createElement("td");
    movie.genres.forEach((genre,index)=>{
      genresTD.append(genre+ ". ");
    })
    row.appendChild(genresTD);

    let durationTD=document.createElement("td");
    durationTD.append(movie.duration);
    row.appendChild(durationTD);

    let imdbratingTD=document.createElement("td");
    imdbratingTD.append(movie.imdbRating);
    row.appendChild(imdbratingTD);

    let actionTD=document.createElement("td");

    let view=document.createElement("i");
    view.classList.add("fa-solid", "fa-eye");
    view.onclick=openmodel.bind(this, movie.id);
    

    let editTD=document.createElement("i");
    editTD.classList.add("fa-solid", "fa-pen-to-square");
    editTD.onclick = updatemodel.bind(this,movie.id)

    let trash=document.createElement("i");
    trash.classList.add("fa-solid", "fa-trash");
    trash.onclick=deleteData.bind(this, movie.id);

    actionTD.appendChild(view);
    actionTD.appendChild(editTD);
    actionTD.appendChild(trash);

    row.appendChild(actionTD);

    document.getElementById("movie_display").append(row);

  });
}

// -----------------------------------------------------FUNCTION TO DISPLAY DATA----------------------------------------------------------

function openmodel(movieid){

  let movie=movies.find((movie,index)=>{

    return movie.id===movieid;
  });

  document.getElementById("title").innerText=movie.title;
  document.getElementById("poster").src=movie.posterurl;
  document.getElementById("genres").innerText=movie.genres;
  document.getElementById("storyline").innerText=movie.storyline;
  document.getElementById("actor").innerText=movie.actors;
  document.getElementById("releasedate").innerText=movie.releaseDate;
  document.getElementById("imdbrating").innerText=movie.imdbRating;
  document.getElementById("avgrating").innerText=movie.averageRating;

  document.getElementById("float_preview").style.display="flex";
}


// -------------------------------  open& close -----------------------------------------------------------------------------

function closewin(modeel, targetID=false){

  if(modeel==targetID || targetID==true){
    document.getElementById(modeel).style.display="none";  
  }

} 

function openAddMovieModel(){

  document.getElementById("add_movie_float_preview").style.display="flex";

}

// ---------------------------------------------------Date cONVERSION----------------------------------------------------

function converttodate(){

  document.getElementById("AddMovieDate").type="date";
}

// ----------------------------------------------------------ADD MOVIE FUNCTION--------------------------------------------------

function addmovie(){

  let lastid;
  
  if(movies.length!==0){
    lastid=movies[movies.length-1].id;
  }
  else{
    lastid=0;
  }

  let movie={

    ratings:[],
    id:lastid+1
  }

  movie.title=document.getElementById("AddMovieTitle").value;
  movie.genres=document.getElementById("AddMovieGenre").value.split(",");
  movie.duration=document.getElementById("AddMovieDuration").value;
  movie.releaseDate=document.getElementById("AddMovieDate").value;
  movie.actors=document.getElementById("AddMovieActor").value.split(",");
  movie.imdbRating=document.getElementById("AddMovieimdbrating").value;
  movie.posterurl=document.getElementById("AddMovieUrl").value;
  movie.storyline=document.getElementById("AddMovieStoryline").value;


  movies.push(movie);
  console.log(movies);
  localStorage.setItem("movies",JSON.stringify(movies));

  // let start=0;
  let filteredData=movies;
  let slicedData=filteredData.slice(start,start+10);
  alert("New Movie Added");
  displaydata(slicedData);
  closewin("add_movie_float_preview");
  document.getElementById("add_form").reset();
}

// ------------------------------------function to DELETE ---------------------------------------------------

function deleteData(id){

  let index=movies.findIndex((movie,index)=>{
    return movie.id===id;
  })

  movies.splice(index,1);
  // let start=0;
  let filteredData=movies;
  let slicedData=filteredData.slice(start,start+10);
  alert("Movie Deleted");
  displaydata(slicedData);
  localStorage.setItem("movies",JSON.stringify(movies));
} 



// ----------------------------------------------------Update Movie: ----------------------------------

let dataToUpdate=null;

function updatemodel(id){

  
  let movieid=movies.find((movie,index)=>{

    return movie.id===id;
  });

  dataToUpdate=movieid;

  let genres="";
  movieid.genres.forEach((genre,index)=>{

  genres+=genre+ ", ";
  // genres=genres.slice(0,-1);
  })

  let actors="";
  movieid.actors.forEach((actor,index)=>{
    actors+= actor+ " ,";
  })

  document.getElementById("UpdateMovieTitle").value=movieid.title;
  document.getElementById("UpdateMovieGenre").value=movieid.genres;
  document.getElementById("UpdateMovieDuration").value=movieid.duration;
  document.getElementById("UpdateMovieDate").value=movieid.releaseDate;
  document.getElementById("UpdateMovieActor").value=movieid.actors;
  document.getElementById("UpdateMovieimdbrating").value=movieid.imdbRating;
  document.getElementById("UpdateMovieUrl").value=movieid.posterurl;
  document.getElementById("UpdateMovieStoryline").value=movieid.storyline;

  document.getElementById("update_movie_float_preview").style.display="flex";
}

function updatedata(){

  dataToUpdate.title=document.getElementById("UpdateMovieTitle").value;
  dataToUpdate.genres=document.getElementById("UpdateMovieGenre").value.split(",");
  dataToUpdate.duration=document.getElementById("UpdateMovieDuration").value;
  dataToUpdate.releaseDate=document.getElementById("UpdateMovieDate").value;
  dataToUpdate.actors=document.getElementById("UpdateMovieActor").value.split(",");
  dataToUpdate.imdbRating=document.getElementById("UpdateMovieimdbrating").value;
  dataToUpdate.posterurl=document.getElementById("UpdateMovieUrl").value;
  dataToUpdate.storyline=document.getElementById("UpdateMovieStoryline").value;


  console.log(dataToUpdate);
  localStorage.setItem("movies",JSON.stringify(movies));

  // let start=0;
  let filteredData=movies;
  let slicedData=filteredData.slice(start,start+10);
  displaydata(slicedData);
  alert("Movie Updated");

  // displaydata(movies);
  closewin("update_movie_float_preview");
}


// ---------------------------------------Filter Functions------------------------------------------------------------

let filterstatus=false;

function FloatFilterFunction(){


  if(filterstatus==false){

    document.getElementById("filter_section").style.marginLeft="0px";
    filterstatus=true;
  }
  else{

    document.getElementById("filter_section").style.marginLeft="-25%";
    filterstatus=false;
  }

}


// -------------------------------------------FUNCTION TO CAPTURE DROPDOWN LIST------------------------------------

let filters={

  genre:null,
  ratings:null
}

function capturedropdown(property, value){

  if(property.value!==null){

    filters[property]=value;
  }

  else{
    filters[property]=null;
  }
  console.log(filters);
}


// ---------------------------------------Filter Function--------------------------------------------------------

function filter(){

  document.getElementById("filter_section").style.marginLeft="-25%" ;

  let filteredData=movies;

  if(filters.ratings!==null){

    filteredData=filteredData.filter((product,index)=> {

      return Math.floor(Number(product.imdbRating))<=Math.floor(Number(filters.ratings));

    })
  }

  if(filters.genre!==null){

    filteredData=filteredData.filter((product,index)=>{

      return product.genres.includes(filters.genre)
    })

  }
  // let start=0;
  let slicedData=filteredData.slice(start,start+10);
  displaydata(slicedData);

}

// ---------------------------------------PAGINATION FUNCTION-----------------------------------------

function pageNext(){

  if(start + 10 < movies.length){

    start+=10;
    let slicedData=movies.slice(start,start+10);
    let currentPageElement=document.getElementById("currentPage");
    currentPageElement.innerText = +currentPageElement.innerText + 1;      //+ operator is used to convert string to number
    serial=start+1;
    displaydata(slicedData);  
  }

}

function pageBack(){

  if(start >=10){

    start-=10;
    let slicedData=movies.slice(start,start+10);
    let currentPageElement=document.getElementById("currentPage");
    currentPageElement.innerText = +currentPageElement.innerText - 1;
    serial=start+1;
    displaydata(slicedData);  
  }
}

