document.addEventListener('DOMContentLoaded', () => {
    // Retrieve the selected recipeId from localStorage
    const recipeId = localStorage.getItem('selectedRecipeId');
    if (recipeId) {
        fetchRecipeDetails(recipeId);
    } else {
        // Handle the case where no recipeId is found (optional)
        console.error('No recipeId found.');
    }
});

async function fetchRecipeDetails(recipeId) {
    const APP_key = '162949a76b0647f990d6e833b4703b95'; // Replace with your actual Spoonacular API key
    const baseURL = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${APP_key}`;
    const response = await fetch(baseURL);
    const data = await response.json();

    // Update elements on the page with the fetched data
    document.getElementById('recipeName').textContent = data.title;
    document.getElementById('recipeImage').src = data.image;

    // Populate ingredients list
    const ingredientsList = document.getElementById('ingredientsList');
    data.extendedIngredients.forEach(ingredient => {
        const li = document.createElement('li');
        li.textContent = ingredient.original;
        ingredientsList.appendChild(li);
    });

    // Populate instructions list
    const instructionsList = document.getElementById('instructionsList');
    data.analyzedInstructions[0].steps.forEach(step => {
        const li = document.createElement('li');
        li.textContent = step.step;
        instructionsList.appendChild(li);
    });

    // Populate nutrition info
    const nutritionInfo = document.getElementById('nutritionInfo');
    nutritionInfo.textContent = `Calories: ${data.nutrition.nutrients[0].amount} ${data.nutrition.nutrients[0].unit}`;

    // Add similar lines for other details like ingredients, instructions, and nutrition info
}
