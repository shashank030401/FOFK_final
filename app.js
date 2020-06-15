require("dotenv").config();
const express = require("express");
const ejs = require("ejs");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended : true}));
app.set("view engine" , "ejs");



mongoose.connect("mongodb+srv://admin-sai:"+process.env.PASSWORD+"@cluster0-hwogi.mongodb.net/fofkDB" , {useNewUrlParser : true , useUnifiedTopology : true , useFindAndModify: false });

const userSchema = new mongoose.Schema({
    username : String,
    email : String,
    message : String
});


const User = new mongoose.model("User" , userSchema);


app.get("/",function(req,res){
    res.render("intro");
});


app.get("/contact" , function(req,res){
    res.render("contact")
});


app.get("/team",function(req,res){
    res.render("team");
})


app.get("/monsary" , function(req,res){
    res.render("monsary");
});

app.post("/contact" , function(req,res){
    const username = req.body.name;
    const email = req.body.email;
    const message = req.body.question;

    const user = new User({
        username : username,
        email : email,
        message : message
    });

    user.save(function(err){
        if(err){
            console.log(err);
        }else{
                res.render("success" , {
                    username : username
                });
        }
    })
    
});

app.listen(process.env.PORT || 3000 , function(){
    console.log("server running at 3000");
})


