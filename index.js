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
  //Get the restaurants menu, and then display the page
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

//Add any other required routes here
app.get("/alerts", (request, response) => {
  let alerts = [];

  Restaurants.forEach((restaurant) => {
    const specials = restaurantData[restaurant.id].menu.filter(
      (item) => item.isSpecial
    );
    if (specials.length > 0) {
      alerts.push({
        restaurantName: restaurant.name,
        specials: specials,
      });
    }
  });

  response.render("alerts", {
    alerts: alerts.length > 0 ? alerts : null,
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
