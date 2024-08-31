const express = require('express');
const articlesRouter = require("./routes/articles");
const Article = require("./models/article");
const mongoose = require('mongoose');
const methodOverride = require("method-override");
const app = express();

mongoose.connect("mongodb://localhost/BlogWebsite")

app.set("view engine", "ejs")
app.use(express.urlencoded({extended: false}))
app.use(methodOverride("_method"))
app.get("/",async(req,res)=>{
    const articles = await Article.find().sort({createdAt:'desc'});
    res.render("articles/index",{articles:articles})
})

app.use("/articles", articlesRouter);

app.listen(3000)