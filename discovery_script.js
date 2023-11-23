const searchForm = document.querySelector('form');
const searchResultDiv = document.querySelector('.search_result');
const container = document.querySelector('.container');
let searchQuery = '';

const spoonacularApiKey = '162949a76b0647f990d6e833b4703b95';
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
        fetchSpoonacularAPI();
        fetchYoutubeAPI();
    }
});

async function fetchSpoonacularAPI(){
    const baseURL = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${spoonacularApiKey}&query=${searchQuery}`;
    try {
        const response = await fetch(baseURL);
        const data = await response.json();
        console.log('Spoonacular API Response:', data);
        if (data.results && data.results.length > 0) {
            generateSpoonacularHTML(data.results);
            searchResultDiv.classList.remove('hidden');
        } else {
            console.log('No results from Spoonacular API');
        }
    } catch (error) {
        console.error('Error fetching from Spoonacular API:', error);
    }
}
function generateSpoonacularHTML(spoonacularResults){
    let generateditem = '';
    spoonacularResults.map(result => {
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
}

async function fetchYoutubeAPI() {
    const baseURL = `https://www.googleapis.com/youtube/v3/search`;
    const params = {
        part: 'snippet',
        q: `${searchQuery} recipe`,
        type: 'thumbnail',
        maxResults: 10,
        key: youtubeApiKey,
    };

    const url = `${baseURL}?${new URLSearchParams(params)}`;
    const response = await fetch(url);
    const data = await response.json();
    generateYoutubeHTML(data.items);
    console.log(data);
}
function generateYoutubeHTML(youtubeResults) {
    let generateditem = '';
    youtubeResults.forEach(result => {
        const thumbnailUrl = result.snippet.thumbnails.medium.url;
        generateditem +=
        `
        <div class="item">
            <a href="https://www.youtube.com/watch?v=${result.id.videoId}" target="_blank">
                <img src="${thumbnailUrl}" alt="Video Thumbnail">
            </a>
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

function showRecipeDetails(recipeId) {
    localStorage.setItem('selectedRecipeId', recipeId);
    window.location.href = 'recipe.html';
}
