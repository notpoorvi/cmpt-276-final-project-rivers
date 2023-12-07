const searchForm = document.querySelector('form');
const searchResultDiv = document.querySelector('.search_result');
const container = document.querySelector('.container');
let searchQuery = '';

// const APP_key = '34959198c63d4883b456da1d12c36061';
const APP_key = '162949a76b0647f990d6e833b4703b95';

function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// searchForm.addEventListener('submit', async (e) => {
//     e.preventDefault();
//     searchQuery = e.target.querySelector('input').value;
//     await fetchAPI(searchQuery);
//     fetchYouTubeAPI(searchQuery);
// });

if (searchForm) {
    searchForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      searchQuery = e.target.querySelector('input').value;
      await fetchAPI(searchQuery);
      fetchYouTubeAPI(searchQuery);
    });
  }

function applyFilters() {
    fetchAPI(searchQuery);
}

document.addEventListener('DOMContentLoaded', () => {
    searchQuery = getQueryParam('recipe');
    document.getElementById('searchRecipeInput').value = searchQuery;
    fetchAPI(searchQuery);
    fetchYouTubeAPI(searchQuery);
});

async function fetchAPI(searchQuery) {
    
    const searchResultDiv = document.querySelector('.search_result');
    console.log(searchResultDiv.innerHTML)
    if (!searchResultDiv) {
        console.error("search_result div not found");
        return;
    }
    
    searchResultDiv.classList.add('hidden');

    const cuisineFilter = document.getElementById('cuisine').value;
    const vegetarianFilter = document.getElementById('vegetarian').checked;
    const veganFilter = document.getElementById('vegan').checked;
    const glutenFreeFilter = document.getElementById('glutenfree').checked;
    const lowCarbFilter = document.getElementById('lowcarb').checked;

    let baseURL = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${APP_key}&query=${searchQuery}&number=30`;

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
    // console.log(data);
}

function generateHTML(the_results) {
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
    localStorage.setItem('selectedRecipeId', recipeId);
    window.location.href = 'recipe.html';
}

async function fetchYouTubeAPI(searchQuery) {
    const youtubeResultsDiv = document.getElementById('youtubeResults');

    const youtubeAPIKey = 'AIzaSyCB3qbGjQvnioKgkvGKGLvC261taR8tejE';
    // const youtubeAPIKey = 'AIzaSyDoWT8CPztZQtjIrLpuVI_w5aAm5FdvIuE';

    if (!searchQuery) {
        searchQuery = 'easy';
    }

    const youtubeQuery = `${searchQuery} recipe`;

    const youtubeBaseURL = 'https://www.googleapis.com/youtube/v3/search';

    const youtubeResponse = await fetch(`${youtubeBaseURL}?part=snippet&maxResults=40&q=${youtubeQuery}&key=${youtubeAPIKey}`);
    const youtubeData = await youtubeResponse.json();

    generateYouTubeHTML(youtubeData.items);
    youtubeResultsDiv.classList.remove('hidden');
}

function generateYouTubeHTML(youtubeResults) {
    let generatedItems = '';
    youtubeResults.forEach(result => {
        const videoId = result.id.videoId;
        const title = result.snippet.title;
        const thumbnailUrl = result.snippet.thumbnails.medium.url;

        generatedItems += `
            <div class="youtube_item" onclick="showYoutubeRecipeDetails('${videoId}', '${title}')">
                <a href=#>
                    <img src="${thumbnailUrl}" alt="${title}">
                    <p class="youtube_title">${title}</p>
                </a>
            </div>
        `;
    });

    const youtubeResultsDiv = document.getElementById('youtubeResults');
    youtubeResultsDiv.innerHTML = generatedItems;
}

function showYoutubeRecipeDetails(videoId, title) {
    localStorage.setItem('selectedVideoDetails', JSON.stringify({ videoId, title }));
    window.location.href = 'youtube.html';
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { fetchAPI, fetchYouTubeAPI };
  }