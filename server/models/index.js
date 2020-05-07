const db = require("./database");
const Pug = require("./pug.model");
const Coffee = require("./coffee.model");

// VVV assign relations below VVV //

// Coffee.belongsTo(Pug);
Pug.belongsTo(Coffee, { as: "favoriteCoffee" });
Pug.belongsToMany(Pug, { as: "friends", through: "friendship" });
// ^^^ assign relations above ^^^ //

module.exports = {
  db,
  Pug,
  Coffee,
};
