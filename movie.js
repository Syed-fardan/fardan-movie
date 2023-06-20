const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=7f5fd47616c5f3b051479d1c858c36c3&page=1';
const Img_Path ='https://image.tmdb.org/t/p/w1280';
const Search_Url= 'https://api.themoviedb.org/3/search/movie?api_key=7f5fd47616c5f3b051479d1c858c36c3&query="';

getMovieData(API_URL);
const form = document.getElementById('form');
const search = document.querySelector('.search');
const main = document.getElementById('main');
//console.log(main);
async function getMovieData(url){
    const response = await fetch(url);
    try {
        const data = await response.json();
       showMovies(data.results);
    } catch (error) {
        console.log(error);
    }
};
form.addEventListener('submit', (e) => {
    e.preventDefault()

    const searchTerm = search.value

    if(searchTerm && searchTerm !== '') {
        getMovieData(Search_Url + searchTerm)

        search.value = ''
    } else {
        window.location.reload()
    }
})
function showMovies(data){
   main.innerHTML='';
   
   

   data.forEach((movie)=>{
    const movieEl = document.createElement('div');
    movieEl.classList.add('movie');
    const {title,poster_path,overview,vote_average}=movie;
    movieEl.innerHTML=`<img src=${Img_Path+poster_path} alt=${title} loading="lazy">
   <div class="infoMovie">
       <h3>${title}</h3>
       <span class=${getColor(vote_average)}>${vote_average}</span>
   </div>
   <div class="overView">
       <h3>Overview</h3>
       ${overview}
   </div>`
   main.appendChild(movieEl);
   });
//    data.forEach((movie)=>{
//     const {title,poster_path,overview,vote_average}=movie;
//     //console.log(overview);
//     movieEl.innerHTML+=
//     `<img src="${Img_Path+poster_path}" alt="noimage">
//     <div class="infoMovie">
//         <h3>${title}</h3>
//         <span class="${getColor(vote_average)}">${vote_average}</span>
//     </div>
//     <div class="overView">
//         <h3>Overview</h3>
//         ${overview}
//     </div>`
//    })
  
   
};
function getColor(vote_average){
    if(vote_average >=8){
        return 'green';
    }
    else if(vote_average >=5){
        return 'orange';
    }
    else{
        return 'red';
    }
}