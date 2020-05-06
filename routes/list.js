const express = require('express');
const router = new express.Router();
const _ = require('lodash');
const List = require('../models/list.js');
const Item = require('../models/item.js');



const item1 = new Item({
  name: "Hello"
});
const item2 = new Item({
  name: "Click + to add new notes"
});
const item3 = new Item({
  name: "<----- Check this box to delete items"
});

const deafaultItems = [item1, item2, item3];

router.get("/", function(req, res) {
  List.find({}, function(err, allLists) {
    res.render("lists", {
      lists: allLists
    });
  });
});

router.get("/list/:customListId", function(req, res) {
  const customListId = req.params.customListId;
  List.findOne({
    _id: customListId
  }, function(err, foundList) {
    if (foundList) {
      res.render("list.ejs", {
        listTitle: foundList.name,
        newListItems: foundList.items,
        _id: foundList._id
      })
    }
  });
});

router.post("/list", function(req, res) {
  const customListName = _.capitalize(req.body.newList);
  List.findOne({
    name: customListName
  }, function(err, foundList) {
    if (!foundList && !err) {
      const list = new List({
        name: customListName,
        items: deafaultItems
      });
      list.save();
      res.redirect("/");
    } else {
      res.render("list.ejs", {
        listTitle: foundList.name,
        newListItems: foundList.items,
        _id: foundList._id
      })
    }
  });
});

router.post("/list/delete", function(req, res){
  const listId = req.body.listId;
  List.deleteOne({_id: listId}, function(err) {
    if (!err) {
      console.log("Successfully deleted a checked item");
      res.redirect("/");
    } else {
      console.log(err);
    }
  });
})

module.exports = router;
