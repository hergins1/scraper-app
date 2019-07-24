const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Article = new Schema({
    title: {
        type:String,
        required: true
    },

    img: {
        type: String,
        required: true
    },

    link: {
        type: String,
        required: true
    },

    saved: {
        type: Boolean,
        default: false
    }
});

const Articles = mongoose.model("Articles", Article);

module.exports = Articles;
