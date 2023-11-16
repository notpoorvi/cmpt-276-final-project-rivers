const searchForm = document.querySelector('form');
const searchResultDiv = document.querySelector('.search_result');
const container = document.querySelector('.container');
let searchQuery = '';

//customize for spoonacular

const APP_key = '34959198c63d4883b456da1d12c36061';

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    searchQuery = e.target.querySelector('input').value;
    console.log(searchQuery);
    fetchAPI();
});


async function fetchAPI(){
    
    const baseURL = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${APP_key}&query=${searchQuery}`;
    const response = await fetch(baseURL);
    const data = await response.json();
    generateHTML(data.results);
    console.log(data);
}


function generateHTML(the_results){
    let generateditem = '';
    the_results.map(result => {
       generateditem +=
       `
        <div class="item">
            <img src="${result.image}" alt="">
            <div class="flex_container">
                <h1 class="title">${result.title}</h1>
                <a class="view_button" href="#">View original Recipe</a>
            </div>
            <p class="item_data">Ingredients or nutrition goes here</p>
        </div>
       ` 
    })
    searchResultDiv.innerHTML = generateditem;
}

