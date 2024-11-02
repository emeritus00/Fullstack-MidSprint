const { Restaurants, Cuisines } = require("./utils/data");
const express = require("express");
const path = require("path");
const {
  generateRandomMenuItem,
  generateMenu,
  selectRandomCuisine,
} = require("./utils/restaurantUtils");

const app = express();
let restaurantData = {}; //This should be populated soon

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static("public"));

Restaurants.forEach((restaurant) => {
  const cuisine = selectRandomCuisine();
  const menu = generateMenu(cuisine);
  restaurantData[restaurant.id] = { menu, cuisine };
});
/**
 * GET /
 * Renders the homepage that lists cities and restaurant names.
 */
app.get("/", (request, response) => {
  response.render("index", { restaurants: Restaurants });
});

/**
 * GET /restaurant/:name
 * Displays a specific restaurant's random menu.
 * The cuisine is randomly selected and a menu is generated based on it.
 */
app.get("/restaurant", (request, response) => {
  const restaurantId = request.query.restaurantId;
  const restaurant = Restaurants.find((r) => r.id === restaurantId);
  const menuData = restaurantData[restaurantId];

  if (restaurant && menuData) {
    response.render("restaurant", {
      restaurant,
      menu: Array.isArray(menuData.menu) ? menuData.menu : [],
      cuisine: menuData.cuisine,
    });
  } else {
    response.status(404).render("notFound", {
      message: "Restaurant or menu not found",
    });
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
