document.addEventListener('DOMContentLoaded', () => {
    const recipeId = localStorage.getItem('selectedRecipeId');
    if (recipeId) {
        fetchRecipeDetails(recipeId);
    } else {
        console.error('No recipeId found.');
    }
});

async function fetchRecipeDetails(recipeId) {
    // const APP_key = '34959198c63d4883b456da1d12c36061';
    const APP_key = '162949a76b0647f990d6e833b4703b95';
    const baseURL = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${APP_key}`;
    
    try {
        const response = await fetch(baseURL);
        const data = await response.json();

        document.getElementById('recipeName').textContent = data.title;
        document.getElementById('recipeImage').src = data.image;

        const ingredientsList = document.getElementById('ingredientsList');
        if (data.extendedIngredients && data.extendedIngredients.length > 0) {
            data.extendedIngredients.forEach(ingredient => {
                const li = document.createElement('li');
                li.textContent = ingredient.original;
                ingredientsList.appendChild(li);
            });
        } else {
            ingredientsList.textContent = 'No ingredients available.';
        }

        const instructionsList = document.getElementById('instructionsList');
        if (data.analyzedInstructions && data.analyzedInstructions.length > 0) {
            data.analyzedInstructions[0].steps.forEach(step => {
                const li = document.createElement('li');
                li.textContent = step.step;
                instructionsList.appendChild(li);
            });
        } else {
            instructionsList.textContent = 'No instructions available.';
        }

        await fetchNutrition(recipeId);
    } 
    catch (error) {
        // console.error('Error fetching recipe details:', error);
        return
    }
}

async function fetchNutrition(recipeId) {
    const APP_key = '34959198c63d4883b456da1d12c36061';
    // const APP_key = '162949a76b0647f990d6e833b4703b95';
    const baseURL = `https://api.spoonacular.com/recipes/${recipeId}/nutritionWidget.json?apiKey=${APP_key}`;

    try {
        const response = await fetch(baseURL);
        const data = await response.json();

        const nutritionInfo = document.getElementById('nutritionInfo');
        if (data.calories && data.protein && data.carbs && data.fat) {
            nutritionInfo.textContent = `Calories: ${data.calories} | Protein: ${data.protein} | Carbs: ${data.carbs} | Fat: ${data.fat}`;
        } else {
            nutritionInfo.textContent = 'Nutrition information not available.';
        }
    } catch (error) {
        // console.error('Error fetching nutrition info:', error);
        return
    }
}

module.exports = {fetchRecipeDetails, fetchNutrition};