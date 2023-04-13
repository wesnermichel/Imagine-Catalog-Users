const express = require("express");
const router = express.Router();
const startStories = require("../db/storiesSeed.js");
const stories = require("../models/story");

// INDEX
router.get("/", async (req, res) => {
  const animals = await Animal.find({});
  res.render("index.ejs", { animals: animals });
});
//NEW ANIMAL
router.get("/new", (req, res) => {
  res.render("new.ejs");
});

// Posts
router.post("/", async (req, res) => {
  console.log(req.body);
  req.body.extinct = req.body.extinct === "on" ? true : false;
  const newAnimal = await Animal.create(req.body);
  res.redirect("/animals");
});

// SHOW
router.get("/show/:id", async (req, res) => {
  const animal = await Animal.findById(req.params.id);
  res.render("show.ejs", { animal: animal });
});

// EDIT
router.get("/edit/:id/", async (req, res) => {
  const animal = await Animal.findById(req.params.id);
  res.render("edit.ejs", { animal });
});

// SEED
router.get("/seed", async (req, res) => {
  await Animal.deleteMany({});
  await Animal.create(startAnimals);
  res.redirect("/animals");
});

// UPDATE

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  console.log("this post", req.body);

  req.body.extinct = req.body.extinct === "on" ? true : false;
  const animal = await Animal.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  res.redirect("/animals");
});

// DELETE

router.delete("/:id", async (req, res) => {
  const animal = await Animal.findByIdAndDelete(req.params.id);
  res.redirect("/animals");
});

module.exports = router;
