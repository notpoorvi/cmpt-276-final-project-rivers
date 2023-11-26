document.addEventListener('DOMContentLoaded', () => {
  const recipeId = localStorage.getItem('selectedRecipeId')
  if (recipeId) {
    fetchRecipeDetails(recipeId)
  } else {
    console.error('No recipeId found.')
  }
})

async function fetchRecipeDetails (recipeId) {
  /* super-linter-disable */
  // const appKey = '34959198c63d4883b456da1d12c36061'
  // const appKey = '162949a76b0647f990d6e833b4703b95'
  const appKey = '13b28ccdb5d34f43bf8ce054b837368a'
  /* super-linter-enable */
  const baseURL = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${appKey}`
  try {
    const response = await fetch(baseURL)
    const data = await response.json()

    document.getElementById('recipe-name').textContent = data.title
    document.getElementById('recipe-image').src = data.image

    const ingredientsList = document.getElementById('ingredients-list')
    if (data.extendedIngredients && data.extendedIngredients.length > 0) {
      data.extendedIngredients.forEach(ingredient => {
        const li = document.createElement('li')
        li.textContent = ingredient.original
        ingredientsList.appendChild(li)
      })
    } else {
      ingredientsList.textContent = 'No ingredients available.'
    }

    const instructionsList = document.getElementById('instructions-list')
    if (data.analyzedInstructions && data.analyzedInstructions.length > 0) {
      data.analyzedInstructions[0].steps.forEach(step => {
        const li = document.createElement('li')
        li.textContent = step.step
        instructionsList.appendChild(li)
      })
    } else {
      instructionsList.textContent = 'No instructions available.'
    }

    await fetchNutrition(recipeId)
  } catch (error) {
    console.error('Error fetching recipe details:', error)
  }
}

async function fetchNutrition (recipeId) {
  /* super-linter-disable */
  // const appKey = '34959198c63d4883b456da1d12c36061'
  // const appKey = '162949a76b0647f990d6e833b4703b95'
  const appKey = '13b28ccdb5d34f43bf8ce054b837368a'
  /* super-linter-enable */
  const baseURL = `https://api.spoonacular.com/recipes/${recipeId}/nutritionWidget.json?apiKey=${appKey}`

  try {
    const response = await fetch(baseURL)
    const data = await response.json()

    const nutritionInfo = document.getElementById('nutrition-info')
    if (data.calories && data.protein && data.carbs && data.fat) {
      nutritionInfo.textContent = `Calories: ${data.calories} | Protein: ${data.protein} | Carbs: ${data.carbs} | Fat: ${data.fat}`
    } else {
      nutritionInfo.textContent = 'Nutrition information not available.'
    }
  } catch (error) {
    console.error('Error fetching nutrition info:', error)
  }
}
