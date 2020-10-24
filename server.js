const express = require("express");
const ejsLayouts = require("express-ejs-layouts");
const axios = require("axios");
const app = express();
const methodOverride = require("method-override");

app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.use(ejsLayouts);
//body-parser middleware
app.use(express.urlencoded({ extend: false }));

const movies = require("./controllers/movies");

//As a user I want to go to a home page to search a database full of movies.
app.use("/movies", movies);

//As a user, I want to see movie results based on my search query.

//As a user, I want to pick a movie result and see detailed information about the movie.

app.listen(8000, () => {
    console.log("You're listening on port 8000");
});
