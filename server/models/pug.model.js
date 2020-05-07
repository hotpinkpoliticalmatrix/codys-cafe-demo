const Sequelize = require("sequelize");
const db = require("./database");
const Coffee = require("./coffee.model");

const Pug = db.define("pugs", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  age: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  biography: {
    type: Sequelize.TEXT,
  },
});

Pug.prototype.isPuppy = function () {
  return this.age < 1;
};

Pug.prototype.shortBio = function () {
  let punctuations = "!.?";
  for (let i = 0; i < this.biography.length; i++) {
    if (punctuations.indexOf(this.biography[i]) !== -1) {
      return this.biography.slice(0, i);
    }
  }
};

Pug.findByCoffee = function (coffeeName) {
  const pugs = Pug.findAll({
    include: {
      model: Coffee,
      as: "favoriteCoffee",
      where: {
        name: coffeeName,
      },
    },
  });
  return pugs;
  // const coffeeType = Coffee.findOne({
  //   where: {
  //     name: coffeeName,
  //   },
  // });
  // console.log(coffeeType);
  // const pugs = Pug.findAll({
  //   where: {
  //     favoriteCoffeeId: coffeeType.id,
  //   },
  // });
  // console.log(pugs);
  // return pugs;
};

Pug.beforeSave((pug) => {
  pug.name = pug.name[0].toUpperCase() + pug.name.slice(1);
});

module.exports = Pug;
