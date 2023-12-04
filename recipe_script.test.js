const { fetchRecipeDetails } = require('./recipe_script');

global.fetch = jest.fn().mockResolvedValue({
    json: jest.fn().mockResolvedValue({
        title: 'Pasta Margherita',
        image: 'https://spoonacular.com/recipeImages/511728-556x370.jpg',
        extendedIngredients: [
            { original: '¼ cup fresh basil, thinly sliced' },
            { original: '¼ cup fresh basil, thinly sliced' },
            { original: '12 ounces fresh mozzarella cheese, cut into ½-inch cubes'},
            { original: '1 garlic clove, pressed'},
            { original: '10 oz grape tomatoes, cut in half lengthwise'},
            { original: '½ tsp kosher salt'},
            { original: '¼ cup extra-virgin olive oil'},
            { original: '1 pound linguine pasta'},
        ],
        analyzedInstructions: [
            { steps: [{ step: 'Whisk oil, garlic, basil, salt together in large bowl.' }, { step: 'Add tomatoes and mozzarella then gently toss to combine; set aside.Cook pasta according to package directions for al dente.' }, {step: 'Drain well.'}, {step: 'Add pasta to tomato mixture and gently toss to combine.'}, {step: 'Serve immediately.'}] },
        ],
    }),
});

test('fetchRecipeDetails should fetch and display recipe details', async () => {
    localStorage.setItem('selectedRecipeId', '511728');

    await fetchRecipeDetails('511728');
    expect(fetch).toHaveBeenCalledWith(
        'https://api.spoonacular.com/recipes/511728/information?apiKey=162949a76b0647f990d6e833b4703b95'
    );
});

const { fetchNutrition } = require('./recipe_script');

global.fetch = jest.fn().mockResolvedValue({
    json: jest.fn().mockResolvedValue({
        calories: 809,
        protein: 34,
        carbs: 89,
        fat: 34,
    }),
});

test('fetchNutrition should fetch and display nutrition information', async () => {
    await fetchNutrition('511728');

    expect(fetch).toHaveBeenCalledWith(
        'https://api.spoonacular.com/recipes/511728/nutritionWidget.json?apiKey=34959198c63d4883b456da1d12c36061'
    );
});
