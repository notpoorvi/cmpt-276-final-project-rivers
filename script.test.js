const { searchRecipe } = require('./script');

document.getElementById = jest.fn(() => ({ value: 'pasta' }));
window.location.href = '';

test('searchRecipe redirects to discovery_page.html with the correct query parameter for pasta', () => {
    const preventDefault = jest.fn();
    const originalLocation = window.location;
    delete global.window.location;
    global.window.location = { href: '' };
    searchRecipe({ preventDefault });
    expect(preventDefault).toHaveBeenCalled();
    expect(global.window.location.href).toContain('discovery_page.html?recipe=pasta');
    global.window.location = originalLocation;
});
  
