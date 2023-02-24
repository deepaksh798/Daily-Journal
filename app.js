//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "Getting motivated to write is often very difficult, therefore, writing something you have very little passion for does not make it any easier.";
const aboutContent = "Hy,I'm Deepak and I'm a Web Developer, recently I have worked on many projects this is one of them. So it's a journal writing web site you can write your thoughts in compose section and your text will be published on the Home page.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

var posts = [];

app.get("/", function(req, res){
  res.render("home", {
    StartingContent: homeStartingContent,
    posts: posts
  });
});

app.get("/about", function(req, res){
  res.render("about",{about: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){

  const post = {
    title: req.body.text1,
    content: req.body.text2
  };

  posts.push(post);

  res.redirect("/");
});

app.get("/posts/:topic", function(req, res){
  const postUrl = _.lowerCase(req.params.topic);

  posts.forEach(function(post){
    const reqTitle = _.lowerCase(post.title);

    if(postUrl === reqTitle){

      res.render("post", {
        title: post.title,
        content: post.content
      });
    }
  });

});



app.listen(3000, function() {
  console.log("Server started on port 3000");
});