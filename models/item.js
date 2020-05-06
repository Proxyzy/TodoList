const mongoose = require('mongoose');

const Item = mongoose.model("Item", {
  name: String
});

module.exports = Item;
