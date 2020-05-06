const mongoose = require('mongoose');

const itemsSchema = {
  name: String
};

const List = mongoose.model("List", {
  name: String,
  items: [itemsSchema]
});

module.exports = List;
