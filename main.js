const shortid = require('shortid');
const express=require("express");
let app=express();
const port=8000;
const mongoose=require("mongoose");
const path=require("path");
const List=require("./database/data.js");
require('dotenv').config();

const URL_DB=process.env.DBurl;


app.use(express.static(path.join(__dirname,"public")));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));
app.use(express.urlencoded({extended:true}));




main()
.then((res)=>{
    console.log("successfully connected to database");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect(URL_DB);
}

app.post("/submit",async(req,res)=>{
let data=req.body;
console.log(data);
let code=shortid.generate();
console.log(code);
let Lis1= new List({link:data.link , ids:code});
Lis1.save()
.then((result)=>{
    console.log(result);
})
.catch((err)=>{
    console.log(err);
});
let link2=await List.findOne({ids:code});
res.render("success.ejs",{link2});
});


app.get("/url/:idsp",async(req,res)=>{
let {idsp}=req.params;
let relink= await List.findOne({ids:idsp});
res.redirect(relink.link);
});

app.get("/home",(req,res)=>{
res.render("home.ejs");
});
app.listen(port,()=>{
    console.log(`listening on ${port} port successully`);
    });