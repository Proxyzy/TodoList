const express = require('express');
const router = new express.Router();
const List = require('../models/list.js');
const Item = require('../models/item.js');

router.post("/task", function(req, res) {

  const itemName = req.body.newItem;
  const listId = req.body.listId;

  const item = new Item({
    name: itemName
  });
    List.findOne({
      _id: listId
    }, function(err, foundList) {
      foundList.items.push(item);
      foundList.save();
      res.redirect("/list/" + listId);
    });
});

router.post("/task/delete", function(req, res) {
  const checkedItemId = req.body.checkbox;
  const listId = req.body.listId;
  console.log(checkedItemId);
    List.findOneAndUpdate({
      _id: listId
    }, {
      $pull: {
        items: {
          _id: checkedItemId
        }
      }
    }, function(err, foundList) {
      if (!err) {
        console.log("Item was deleted!!");
        res.redirect("/list/" + listId);
      } else {
        console.log(err);
      }
    })
});

module.exports = router;
