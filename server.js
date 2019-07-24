const express = require("express");
const axios = require("axios");
const cherrio = require("cheerio");
const logger = require("morgan");
const mongoose = require("mongoose");
const exphbs = require('express-handlebars');
let path = require("path");

const db = require(".models");

const PORT = 3000;

const app = express();

const MONGODB_URI = process.env.MONGODB_URI;

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.engine(
    'handlebars',
    exphbs({
        defaultLayout: 'main'
    })
);

app.set('view engine', 'handlebars');

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

app.get("/all", function (req, res) {
    db.scrapedData.find({}, function (error, found) {
        if (error) {
            console.log(error)
        }
        else {
            res.json(found);
        }
    });
});

app.get("/scrape", function (req, res) {

    axios.get("https://fox4kc.com/category/news/")
        .then(function (response) {
            let $ = cheerio.load(response.data);
            let result = [];

            $("li.story").each(function (i, element) {
                let img = $(element).find("a").find("img").attr("src");
                let link = $(element).find("a");
                let title = $(element).find("h4").find("a").text();
            })

            if (img && link && title) {
                result.push({
                    title: title,
                    img: img,
                    link: link
                })
            }
        });

    db.Articles.create(results)
        .then(function (dbArticle) {
            console.log(dbArticle)
            res.redirect("/")
        })
        .catch(function (err) {
            console.log(err);
            res.send(err)
        })
})

app.get('/articles', function (req, res) {

    db.Articles.find({ "saved": false })
        .then(function (dbArticle) {

            res.json(dbArticle);
        })
        .catch(function (err) {

            res.json(err);
        });
});


app.get('/delete', function (req, res) {

    db.Article.remove({}, function (error, response) {

        if (error) {
            console.log(error);
            res.send(error);
        }
        else {
            res.redirect("/");
        }
    });
});

app.post("/articles/save/:id", function (req, res) {
    db.Article.findOneAndUpdate({ _id: req.params.id }, { "saved": true })
        .then(function (dbArticle) {
            res.json(dbArticle);
        })
        .catch(function (err) {
            res.json(err);
        });
});

app.get("/", function (req, res) {
    res.render("index");
});

app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});