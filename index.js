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

app.get("/update/:id", (req, res) => {
    const postId = req.params.id;

    posts.forEach(post => {
        if (postId == post.id) {
            res.render("update.ejs", {postUpdate: post});
        }
    });
});

app.get("/delete/:id", (req, res) => {
    const postId = req.params.id;

    posts.forEach(post => {
        if (postId == post.id) {
            res.render("delete.ejs", {postDelete: post});
        }
    });
});

app.post("/submit", (req, res) => {
    let newPost = {
        id: posts.length + 1, 
        title: req.body['title'],
        content: req.body['content'],
        date: new Date(),
        author: req.body['author'],
    };
    posts.push(newPost);
    res.redirect("/");
});

app.post("/submit/:id", (req, res) => {
    const postId = req.params.id;

    posts.forEach(post => {
        if (post.id == postId){
            post.title = req.body['title'];
            post.author = req.body['author'];
            post.content = req.body['content'];
            post.date = new Date();
            } 
        res.redirect("/");       
    });
});

app.post("/delete/:id", (req, res) => {
    const postId = parseInt(req.params.id);

    posts = posts.filter(post => post.id !== postId);
    res.redirect("/");       
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});