require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE_URL);

mongoose.connection.on("connected", () => {
  console.log("Connected to the database.");
});

mongoose.connection.on("error", (err) => {
  console.log("Error connecting to the database");
  console.log(err);
});

mongoose.connection.on("disconnected", () => {
  console.log("Disconnected from the database");
});

module.exports = mongoose;
