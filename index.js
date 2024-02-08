import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
let posts = [];

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index.ejs", {postsList: posts});
});

app.get("/add", (req, res) => {
    res.render("add.ejs");
});

app.post("/submit", (req, res) => {
    let newPost = {
        title: req.body['title'],
        content: req.body['content'],
        date: new Date(),
        author: req.body['author'],
    };
    posts.push(newPost);
    res.redirect("/");
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });