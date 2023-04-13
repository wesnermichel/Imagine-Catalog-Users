const express = require("express");
const router = express.Router();
const startStories = require("../db/storiesSeed.js");
const Stories = require("../models/story");

// INDEX
router.get("/", async (req, res) => {
  const story = await Stories.find({});
  res.render("index.ejs", { Story: stories });
});
//NEW STORY
router.get("/new", (req, res) => {
  res.render("new.ejs");
});

// POSTS
router.post("/", async (req, res) => {
  console.log(req.body);
  req.body.humanwritten = req.body.humanwritten === "on" ? true : false; // Need to update this in the form
  const newAnimal = await Animal.create(req.body);
  res.redirect("/animals");
});

// SHOW
router.get("/show/:id", async (req, res) => {
  const story = await story.findById(req.params.id);
  res.render("show.ejs", { story: story });
});

// EDIT
router.get("/edit/:id/", async (req, res) => {
  const story = await Stories.findById(req.params.id);
  res.render("edit.ejs", { story });
});

// SEED
router.get("/seed", async (req, res) => {
  await Stories.deleteMany({});
  await Stories.create(startStories);
  res.redirect("/stories");
});

// UPDATE

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  console.log("This Post", req.body);

  req.body.humanwritten = req.body.humanwritten === "on" ? true : false;
  const story = await Story.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  res.redirect("/animals");
});

// DELETE

router.delete("/:id", async (req, res) => {
  const story = await Stories.findByIdAndDelete(req.params.id);
  res.redirect("/stories");
});

module.exports = router;
