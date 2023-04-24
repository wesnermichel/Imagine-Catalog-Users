const express = require("express");
const router = express.Router();
const startStories = require("../db/storiesSeed.js");
const Story = require("../model/stories.js");

// INDEX
router.get("/", async (req, res) => {
  const stories = await Story.find({});
  res.render("index.ejs", { stories, user: req.sessions.currentUser.username });
  //It used to be res.render("index.ejs", { stories: stories);
});
//NEW STORY
router.get("/new", (req, res) => {
  res.render("new.ejs");
});

// POSTS
router.post("/", async (req, res) => {
  req.body.humanWritten = req.body.humanWritten === "on" ? true : false; // Need to update this in the form
  const newStory = await Story.create(req.body);
  res.redirect("/stories");
});

// SHOW
router.get("/show/:id", async (req, res) => {
  const story = await Story.findById(req.params.id);
  res.render("show.ejs", { story: story });
});

// EDIT
router.get("/edit/:id/", async (req, res) => {
  const story = await Story.findById(req.params.id);
  res.render("edit.ejs", { story });
});

// SEED
router.get("/seed", async (req, res) => {
  await Story.deleteMany({});
  await Story.create(startStories);
  res.redirect("/stories");
});

// UPDATE

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  console.log("This Post", req.body);

  req.body.humanWritten = req.body.humanWritten === "on" ? true : false;
  const story = await Story.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  res.redirect("/stories");
});

// DELETE

router.delete("/:id", async (req, res) => {
  const story = await Story.findByIdAndDelete(req.params.id);
  res.redirect("/stories");
});

module.exports = router;
