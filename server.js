const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");

const PORT = process.env.PORT || 3000;

// const Workout = require("./models/workout.js")
const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workoutTracker", {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

// routes
app.use(require("./routes/api.js"));
app.use(require('./routes/html_routes.js'));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});