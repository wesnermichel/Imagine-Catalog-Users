const mongoose = require("../db/connection");

const Schema = mongoose.Schema;

const storySchema = new mongoose.Schema({
  title: String,
  bookImage: String,
  humanWritten: Boolean,
  author: String,
  story: String,
});

const Story = mongoose.model("Story", storySchema);

module.exports = Story;
