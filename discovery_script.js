const searchForm = document.querySelector('form');
const searchResultDiv = document.querySelector('.search_result');
const container = document.querySelector('.container');
let searchQuery = '';

//customize for spoonacular

// const APP_key = '34959198c63d4883b456da1d12c36061';
const APP_key = '162949a76b0647f990d6e833b4703b95';
const youtubeApiKey = 'AIzaSyDvtNzdBCepDaWXlERreRS1HRl1vU_Z4mA';

// Function to get URL parameters
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    searchQuery = e.target.querySelector('input').value;
    console.log(searchQuery);
    if (searchQuery.trim() !== '') {
        fetchAPI();
    }
});

/*document.addEventListener('DOMContentLoaded', () => {
    // Get the recipe name from the URL parameter
    searchQuery = getQueryParam('recipe');
    // Set the search bar value
    document.getElementById('searchRecipeInput').value = searchQuery;
    // Fetch recipes
    fetchAPI();
});*/

async function fetchAPI() {
    searchResultDiv.classList.add('hidden');
    const baseURL = `https://www.googleapis.com/youtube/v3/search`;
    const params = {
        part: 'snippet',
        q: `${searchQuery} recipe`,
        type: 'thumbnail',
        key: youtubeApiKey,
    };

    const url = `${baseURL}?${new URLSearchParams(params)}`;
    const response = await fetch(url);
    const data = await response.json();
    generateHTML(data.items);
    searchResultDiv.classList.remove('hidden');
    console.log(data);
}

function generateHTML(youtubeResults) {
    let generateditem = '';
    youtubeResults.forEach(result => {
        generateditem +=
        `
        <div class="item">
            <iframe width="100%" height="315" src="https://www.youtube.com/embed/${result.id.videoId}" frameborder="0" allowfullscreen></iframe>
            <div class="flex_container">
                <h1 class="title">${result.snippet.title}</h1>
                <a class="view_button" href="https://www.youtube.com/watch?v=${result.id.videoId}" target="_blank">Watch on YouTube</a>
            </div>
            <p class="item_data">${result.snippet.description}</p>
        </div>
       `;
    });

    searchResultDiv.innerHTML = generateditem;
}

/*async function fetchAPI(){
    searchResultDiv.classList.add('hidden');
    const baseURL = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${APP_key}&query=${searchQuery}`;
    const response = await fetch(baseURL);
    const data = await response.json();
    generateHTML(data.results);
    searchResultDiv.classList.remove('hidden');
    console.log(data);
}


function generateHTML(the_results){
    let generateditem = '';
    the_results.map(result => {
       generateditem +=
       `
        <div class="item" onclick="showRecipeDetails(${result.id})">
            <img src="${result.image}" alt="">
            <div class="flex_container">
                <h1 class="title">${result.title}</h1>
                <a class="view_button" href="#" onclick="showRecipeDetails(${result.id})">View original Recipe</a>
            </div>
            <p class="item_data">Ingredients or nutrition goes here</p>
        </div>
       `
    })
    searchResultDiv.innerHTML = generateditem;
}*/

function showRecipeDetails(recipeId) {
    // Store the selected recipeId in localStorage
    localStorage.setItem('selectedRecipeId', recipeId);
    // Redirect to the recipe.html page
    window.location.href = 'recipe.html';
}
