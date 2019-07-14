const express = require("express");
const mongojs = require("mongojs");
const axios = require("axios");
const cherrio = require("cheerio");

const PORT = 3000;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

const databaseUrl = "scraper"
const collections = ["scrapedData"];

const db = mongojs(databaseUrl, collections);
db.on("error", function(error){
    console.log("Database Error: ", error);
});

app.get("/", function(req, res){
    res.send("Testing");
});

app.get("/all", function(req, res){
    db.scrapedData.find({}, function(error, found){
        if (error){
            console.log(error)
        }
        else{
            res.json(found);
        }
    });
});

app.get("/scrape", function(req, res){
    
    axios.get("https://fox4kc.com/category/news/")
    .then(function(response){
        let $ = cheerio.load(response.data);
        let result = [];
        
        $("li.story").each(function(i, element){
            let img = $(element).find("a").find("img").attr("src");
            let link = $(element);
            let title = $(element);
        })
    })
})