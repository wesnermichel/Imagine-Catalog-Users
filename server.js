// DEPENDENCIES
require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const methodOverride = require("method-override");
const app = express();
const session = require("express-session");
const MongoStore = require("connect-mongo");

app.use(
  session({
    // The store needs to know that its a mongo databse and it nees to connect to a DB connection
    sessionstore: MongoStore.create({
      mongoUrl: process.env.DATABASE_URL,
    }),
    //The secret ensures its not the same out attack and it signs every session
    secret: process.env.SECRET,
    //No resaving the same session andsaving the unintialized session
    resave: false,
    saveUninitialized: false,
    cookie: {
      expiresmaxAge: 1000 * 60 * 60 * 24 * 30,
      //This sets the cookie to last for 30 days , because  its in milliesecond
    },
  })
);
app.get("/", (req, res) => {
  res.send("default route");
});

// MIDDLEWARE
app.set("view engine", "ejs");
app.use(morgan("tiny"));
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const storyController = require("./controllers/stories");
const userController = require("./controllers/users");
app.use("/stories", storyController);
app.use("", userController);
// app.use("/");
app.listen(3004, () =>
  console.log(`express is listening on port: ${process.env.PORT}`)
);
