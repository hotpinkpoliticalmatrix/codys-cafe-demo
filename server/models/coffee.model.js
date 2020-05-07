const Sequelize = require("sequelize");
const db = require("./database");

const Coffee = db.define("coffee", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  ingredients: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    defaultValue: [],
  },
});

Coffee.prototype.getIngredients = function () {
  return this.ingredients.join(", ");
};

Coffee.findByIngredient = function (ingredient) {
  const drink = Coffee.findAll({
    where: {
      ingredients: {
        [Sequelize.Op.contains]: [ingredient],
      },
    },
  });
  return drink;
};

Coffee.beforeSave((coffee) => {
  if (!coffee.ingredients.includes("love")) {
    coffee.ingredients.push("love");
  }
});

module.exports = Coffee;
