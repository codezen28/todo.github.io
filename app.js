const express=require("express");  // Here we are supposed to create a node app for which we will require express 
const https=require("https");      // To make https request to other server 
const mongoose=require("mongoose");
const bodyParser=require("body-parser");    // This package is used to fetch the input through post request
//+const date=require(__dirname+"/date.js")
const app=express();     // Creating the express app

app.set("view engine", "ejs");               // This will tell express to use ejs as its view engine

let workItems=[];
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));             // To use the static files and folders

mongoose.connect("mongodb://127.0.0.1:27017/todolistDB");

const itemsSchema=new mongoose.Schema({
    name:String                             // Creating the schema of Items
});

const Item=mongoose.model("Item", itemsSchema);       // Creating the model 

const item1=new Item({
    name:"Welcome to our ToDo List"
});

const item2=new Item({
    name:"Hit the + to add new item"
});

const item3= new Item({
    name:"<-- Hit this to delete item"
});

const defaultItems=[item1,item2,item3];




app.get("/",function(req,res){

   // Item.find({}).then(function(foundItems){

            Item.insertMany(defaultItems).then(function(){
    console.log("Success");  // Success
}).catch(function(error){
    console.log(error)
});
res.redirect("/");
       
        res.render("list",{listTitle:"Today", newListItems:defaultItems});    
     
       

    
    let today=new Date();
    let currentDay=today.getDay();
    
   
   let options={
    weekday:"long",
    day:"numeric",
    month :"long"
   };
   let day=today.toLocaleDateString("en-US",options);

});

  

app.post("/",function(req,res){
   const itemName= req.body.newItem;
   const item=new Item({
    name:itemName
   })
item.save();
res.redirect("/");
});

app.get("/work",function(req,res){
    res.render("list",{listTitle:"Work List",newListItems:workItems});
});

// app.post("/work",function(req,res){
//     let item=req.body.newItem;
   
// });



app.listen(3000,function(){
    console.log("Port is ready");
});