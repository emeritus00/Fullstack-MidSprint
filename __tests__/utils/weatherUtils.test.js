const { Cuisines, Dishes } = require("../../utils/data");
const {
  generateRandomMenuItem,
  generateMenu,
  selectRandomCuisine,
} = require("../../utils/restaurantUtils");

describe("Restaurant Functions", () => {
  // Tests for generateRandomMenuItem
  describe("generateRandomMenuItem", () => {
    test("should return undefined if the cuisine does not exist", () => {
      const cuisine = "NonExistentCuisine";
      const menuItem = generateRandomMenuItem(cuisine);

      expect(menuItem).toBeUndefined();
    });
  });

  // Tests for generateMenu
  describe("generateMenu", () => {
    test("should generate a menu with items from the specified cuisine", () => {
      const cuisine = "Italian";
      const menu = generateMenu(cuisine);
      menu.forEach((item) => {
        expect(Dishes[cuisine]).toContain(item);
      });
    });

    test("should generate a menu where each item has a price and isSpecial properties", () => {
      const cuisine = "Italian";
      const menu = generateMenu(cuisine);

      menu.forEach((item) => {
        expect(item).toHaveProperty("price");
        expect(item).toHaveProperty("isSpecial");
      });
    });
  });

  // Tests for selectRandomCuisine
  describe("selectRandomCuisine", () => {
    test("should return a random cuisine from the available cuisines", () => {
      const cuisine = selectRandomCuisine();
      expect(Cuisines).toContain(cuisine);
    });

    test("should return a string representing the cuisine", () => {
      const cuisine = selectRandomCuisine();
      expect(typeof cuisine).toBe("string");
    });
  });
});
