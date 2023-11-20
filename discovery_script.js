const searchForm = document.querySelector('form');
const searchResultDiv = document.querySelector('.search_result');
const container = document.querySelector('.container');
let searchQuery = '';

//customize for spoonacular

const APP_key = '34959198c63d4883b456da1d12c36061';
// const APP_key = '162949a76b0647f990d6e833b4703b95';

// Function to get URL parameters
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    searchQuery = e.target.querySelector('input').value;
    console.log(searchQuery);
    fetchAPI();
});

function applyFilters() {
    fetchAPI(); // Call the fetchAPI function with the selected filters
}

document.addEventListener('DOMContentLoaded', () => {
    // Get the recipe name from the URL parameter
    searchQuery = getQueryParam('recipe');
    // Set the search bar value
    document.getElementById('searchRecipeInput').value = searchQuery;
    // Fetch recipes
    fetchAPI();
});

async function fetchAPI(){
    searchResultDiv.classList.add('hidden');

    const cuisineFilter = document.getElementById('cuisine').value;
    const vegetarianFilter = document.getElementById('vegetarian').checked;
    const veganFilter = document.getElementById('vegan').checked;
    const glutenFreeFilter = document.getElementById('glutenfree').checked;
    const lowCarbFilter = document.getElementById('lowcarb').checked;

    let baseURL = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${APP_key}&query=${searchQuery}&number=30`;
    
    // Add filters to the URL
    if (cuisineFilter) {
        baseURL += `&cuisine=${cuisineFilter}`;
    }

    if (vegetarianFilter) {
        baseURL += '&diet=vegetarian';
    }

    if (veganFilter) {
        baseURL += '&diet=vegan';
    }

    if (glutenFreeFilter) {
        baseURL += '&diet=glutenFree';
    }

    if (lowCarbFilter) {
        baseURL += '&diet=lowCarb';
    }

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
        </div>
       `
    })
    searchResultDiv.innerHTML = generateditem;
}

function showRecipeDetails(recipeId) {
    // Store the selected recipeId in localStorage
    localStorage.setItem('selectedRecipeId', recipeId);
    // Redirect to the recipe.html page
    window.location.href = 'recipe.html';
}
