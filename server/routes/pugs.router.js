const router = require("express").Router();
const { Pug } = require("../models");

router.get("/", async (req, res, next) => {
  try {
    const allPugs = await Pug.findAll();
    if (allPugs) {
      res.send(allPugs);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    next(error);
  }
});

router.get("/favoriteCoffee/:fav", async (req, res, next) => {
  try {
    const favCoffee = await Pug.findByCoffee(req.params.fav);
    if (favCoffee) {
      res.send(favCoffee);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    next(error);
  }
});

router.get("/:pugId", async (req, res, next) => {
  try {
    const pugId = await Pug.findById(req.params.pugId);
    if (pugId) {
      res.send(pugId);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { name, age, biography } = req.body;
    let pupper = {};
    if (name) pupper.name = name;
    if (age) pupper.age = age;
    if (biography) pupper.biography = biography;
    const newPug = await Pug.create(pupper);
    if (newPug) {
      res.status(201).send(newPug);
    } else {
      res.sendStatus(400);
    }
  } catch (error) {
    next(error);
  }
});

router.put("/:pugId", async (req, res, next) => {
  try {
    // const id = req.params.id
    // const pug = req.body
    const pug = await Pug.findById(req.params.pugId);
    if (pug) {
      await pug.update(req.body);
      res.status(200).send(pug);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/:pugId", async (req, res, next) => {
  try {
    const id = req.params.pugId;
    const pug = await Pug.findById(id);
    if (pug) {
      const numRows = await pug.destroy();
      if (numRows) {
        res.sendStatus(204);
      }
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
