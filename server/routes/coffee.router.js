const router = require("express").Router();
const { Coffee } = require("../models");
// Your code here!
// Remember that these routes are already mounted on
// /api/coffee!
router.get("/", async (req, res, next) => {
  try {
    const coffees = await Coffee.findAll();
    res.send(coffees);
  } catch (error) {
    next(error);
  }
});
router.get("/ingredients/:ingredientName", async (req, res, next) => {
  try {
    const coffeeName = req.params.ingredientName;
    const allCoffee = await Coffee.findByIngredient(coffeeName);
    res.send(allCoffee);
  } catch (error) {
    next(error);
  }
});
router.get("/:coffeeId", async (req, res, next) => {
  try {
    const id = req.params.coffeeId;
    const coffee = await Coffee.findById(id);
    if (coffee) {
      res.send(coffee);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    next(error);
  }
});
router.post("/", async (req, res, next) => {
  try {
    const newCoffee = await Coffee.create(req.body);
    res.status(201).send(newCoffee);
  } catch (error) {
    next(error);
  }
});
module.exports = router;
