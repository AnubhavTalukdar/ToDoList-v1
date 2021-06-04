//jshint esversion:6

//the require lines
const express = require("express");
const bodyParser = require("body-parser");
//const request = require("request");


//some declarations
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("payloads"));  //keep all images, stylesheets, etc. under 'resources' folder
app.set("view engine", "ejs");
var items = [], item = "", workItems= [];

//get requests

app.get("/", function(req, res)
{
  console.log("Client connected.")
  var date = new Date();
  var options = {
    day: "numeric",
    month: "long",
    weekday: "long"
  };

  var day = date.toLocaleDateString("en-US", options);

  // res.send("Hola");
  res.render("list", {listTitle: day,  newListItems: items});

}

);

app.get("/work", function(req, res)
{
  res.render("list", {listTitle: "Work List", newListItems: workItems})
});

//post requests

app.post("/clear", function(req, res)
{
    if(req.body.rembutton==="Work List")
    {
      workItems = [];
      res.redirect("/work");
    }

    else
    {
      items = [];
      res.redirect("/");
    }



});

app.post("/", function(req, res)
{
  item = req.body.txt;

  if(req.body.addbtn==="Work List")
  {
    workItems.push(item);
    res.redirect("/work");
  }
  else
  {
  items.push(item);
  res.redirect("/");
  }
});


//server setup

app.listen(3000, '0.0.0.0', function()
{
  console.log("Server started successfully on port 3000.");
});
