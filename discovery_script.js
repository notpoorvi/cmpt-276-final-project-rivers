const searchForm = document.querySelector('form')
const searchResultDiv = document.querySelector('.search-result')
// super-linter-disable
const container = document.querySelector('.container')
// super-linter-enable
let searchQuery = ''

const appKey = '34959198c63d4883b456da1d12c36061'
// const appKey = '162949a76b0647f990d6e833b4703b95'

function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search)
  return urlParams.get(param)
}

searchForm.addEventListener('submit', async (e) => {
  e.preventDefault()
  searchQuery = e.target.querySelector('input').value
  console.log(searchQuery)
  await fetchAPI()
  fetchYouTubeAPI()
})

function applyFilters() {
  fetchAPI()
}

document.addEventListener('DOMContentLoaded', () => {
  searchQuery = getQueryParam('recipe')
  document.getElementById('search-recipe-input').value = searchQuery
  fetchAPI()
  fetchYouTubeAPI()
})

async function fetchAPI () {
  searchResultDiv.classList.add('hidden')

  const cuisineFilter = document.getElementById('cuisine').value
  const vegetarianFilter = document.getElementById('vegetarian').checked
  const veganFilter = document.getElementById('vegan').checked
  const glutenFreeFilter = document.getElementById('glutenfree').checked
  const lowCarbFilter = document.getElementById('lowcarb').checked

  let baseURL = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${appKey}&query=${searchQuery}&number=30`

  if (cuisineFilter) {
    baseURL += `&cuisine=${cuisineFilter}`
  }

  if (vegetarianFilter) {
    baseURL += '&diet=vegetarian'
  }

  if (veganFilter) {
    baseURL += '&diet=vegan'
  }

  if (glutenFreeFilter) {
    baseURL += '&diet=glutenFree'
  }

  if (lowCarbFilter) {
    baseURL += '&diet=lowCarb'
  }

  const response = await fetch(baseURL)
  const data = await response.json()
  generateHTML(data.results)
  searchResultDiv.classList.remove('hidden')
  console.log(data)
}

function generateHTML (theResults) {
  let generateditem = ''
  theResults.map(result => {
    generateditem +=
      `
        <div class="item" onclick="showRecipeDetails(${result.id})">
            <img src="${result.image}" alt="">
            <div class="flex-container">
                <h1 class="title">${result.title}</h1>
                <a class="view-button" href="#" onclick="showRecipeDetails(${result.id})">View original Recipe</a>
            </div>
        </div>
       `
    return null; 
  })
  searchResultDiv.innerHTML = generateditem
}

// super-linter-disable
function showRecipeDetails (recipeId) {
  localStorage.setItem('selectedRecipeId', recipeId)
  window.location.href = 'recipe.html'
}
// super-linter-enable

async function fetchYouTubeAPI () {
  const youtubeResultsDiv = document.getElementById('youtube-results')
  const youtubeAPIKey = 'AIzaSyCB3qbGjQvnioKgkvGKGLvC261taR8tejE'
  // const youtubeAPIKey = 'AIzaSyDoWT8CPztZQtjIrLpuVI_w5aAm5FdvIuE'
  if (!searchQuery) {
    searchQuery = 'easy'
  }
  const youtubeQuery = `${searchQuery} recipe`
  const youtubeBaseURL = 'https://www.googleapis.com/youtube/v3/search'
  const youtubeResponse = await fetch(`${youtubeBaseURL}?part=snippet&maxResults=40&q=${youtubeQuery}&key=${youtubeAPIKey}`)
  const youtubeData = await youtubeResponse.json()

  generateYouTubeHTML(youtubeData.items)
  youtubeResultsDiv.classList.remove('hidden')
}

function generateYouTubeHTML (youtubeResults) {
  let generatedItems = ''
  youtubeResults.forEach(result => {
    const videoId = result.id.videoId
    const title = result.snippet.title
    const thumbnailUrl = result.snippet.thumbnails.medium.url

    generatedItems += `
            <div class="youtube-item" onclick="showYoutubeRecipeDetails('${videoId}', '${title}')">
                <a href=#>
                    <img src="${thumbnailUrl}" alt="${title}">
                    <p class="youtube-title">${title}</p>
                </a>
            </div>
        `;
  });

  const youtubeResultsDiv = document.getElementById('youtube-results')
  youtubeResultsDiv.innerHTML = generatedItems
}

// super-linter-disable
function showYoutubeRecipeDetails(videoId, title) {
  localStorage.setItem('selectedVideoDetails', JSON.stringify({ videoId, title }))
  window.location.href = 'youtube.html'
}
// super-linter-enable
