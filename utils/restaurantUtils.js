const { Dishes, Cuisines, Restaurants } = require("./data");

/**
 * Generates a random menu item based on a given cuisine.
 * @param {string} cuisine - The desired cuisine for the menu item.
 * @returns {*} A random menu item with a name, description, price, and special status.
 */
function generateRandomMenuItem(cuisine) {
  // Implementation here...
  const dishes = Dishes[cuisine];
  const randomIndex = Math.floor(Math.random() * dishes.length);
  const menuItem = dishes[randomIndex];

  // Add price and special status to the menu item
  menuItem.price = (Math.random() * (50 - 10) + 10).toFixed(2); // Random price between 10 and 50
  menuItem.isSpecial = Math.random() > 0.8; // 20% chance to be a daily special

  return menuItem;
}

/**
 * Selects a random cuisine type for a restaurant.
 * @returns {*} A random cuisine type.
 */
function selectRandomCuisine() {
  // Implementation here...
  const randomIndex = Math.floor(Math.random() * Cuisines.length);
  return Cuisines[randomIndex];
}

/**
 * Generates a menu for a restaurant, including a random cuisine type and a list of menu items.
 * @returns {*} An object representing the restaurant's menu, including the cuisine type and items.
 */
function generateMenu(cuisine) {
  const numberOfItems = Math.floor(Math.random() * 5) + 3; // Random number of items between 3 and 7
  let menu = [];
  for (let i = 0; i < numberOfItems; i++) {
    menu.push(generateRandomMenuItem(cuisine));
  }
  return menu;
}

/**
 * Additional utility functions can be defined here if needed.
 */

module.exports = { generateRandomMenuItem, selectRandomCuisine, generateMenu };
