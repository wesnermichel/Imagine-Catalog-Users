const express = require("express");
const router = express.Router();
const startStories = require("../db/storiesSeed.js");
const Story = require("../model/stories.js");

// INDEX
router.get("/", async (req, res) => {
  let user;
  console.log(req.session);
  if (req.session.currentUser) user = req.session.currentUser.username;
  // wait or this to complete
  // Stories.find() is a Promise
  // Promise is resolved or rejected
  const stories = await Story.find({});
  // then run the next line of code
  // res.send(fruits);
  res.render("stories/index.ejs", { stories, user });
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
