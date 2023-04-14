// Dependencies
require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const methodOverride = require("method-override");
const app = express();

// MIDDLEWARE
app.use(morgan("tiny"));
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("default route");
});

const storyController = require("./controllers/stories");
app.use("/stories", storyController);

app.listen(3004, () =>
  console.log(`express is listening on port: ${process.env.PORT}`)
);
