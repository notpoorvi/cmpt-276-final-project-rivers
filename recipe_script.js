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
    const APP_key = '162949a76b0647f990d6e833b4703b95';
    const baseURL = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${APP_key}`;
    const response = await fetch(baseURL);
    const data = await response.json();

    document.getElementById('recipeName').textContent = data.title;
    document.getElementById('recipeImage').src = data.image;

    const ingredientsList = document.getElementById('ingredientsList');
    data.extendedIngredients.forEach(ingredient => {
        const li = document.createElement('li');
        li.textContent = ingredient.original;
        ingredientsList.appendChild(li);
    });

    const instructionsList = document.getElementById('instructionsList');
    data.analyzedInstructions[0].steps.forEach(step => {
        const li = document.createElement('li');
        li.textContent = step.step;
        instructionsList.appendChild(li);
    });

    await fetchNutrition(recipeId);
}

async function fetchNutrition(recipeId) {
    const APP_key = '162949a76b0647f990d6e833b4703b95';
    const baseURL = `https://api.spoonacular.com/recipes/${recipeId}/nutritionWidget.json?apiKey=${APP_key}`;

    try {
        const response = await fetch(baseURL);
        const data = await response.json();

        const nutritionInfo = document.getElementById('nutritionInfo');
        nutritionInfo.textContent = `Calories: ${data.calories} | Protein: ${data.protein} | Carbs: ${data.carbs} | Fat: ${data.fat}`;

    } catch (error) {
        console.error('Error fetching nutrition info:', error);
    }
}