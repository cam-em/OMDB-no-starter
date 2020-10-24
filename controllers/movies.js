require("dotenv").config();

const express = require("express");
const router = express.Router();
const ejsLayouts = require("express-ejs-layouts");
const app = express();
const fs = require("fs");
const methodOverride = require("method-override");
const axios = require("axios");

app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.use(ejsLayouts);
//body-parser middleware
app.use(express.urlencoded({ extend: true }));

router.get("/", (req, res) => {
    //res.render('movies/index.ejs')
    let movieFilter = req.query.q;

    if (movieFilter !== undefined) {
        axios
            .get(
                `http://www.omdbapi.com/?apikey=${process.env.API_KEY}&s=${movieFilter}`
            )
            .then((response) => {
                //console.log(response.data)
                const search = response.data.Search;
                //console.log(search);
                res.render("movies/results.ejs", { data: search });
            })
            .catch((e) => {
                console.log(e);
            });
    } else {
        res.render("home.ejs");
        //res.end();
    }
});

router.get("/:movie_id", (req, res) => {
    let movieID = req.params.movie_id;
    axios
        .get(
            `http://www.omdbapi.com/?apikey=${process.env.API_KEY}&i=${movieID}`
        )
        .then((response) => {
            console.log(response.data);
            res.send(response.data);
        })
        .catch((e) => {
            console.log(e);
        });
    //res.send(req.params.movie_id);
});

module.exports = router;
