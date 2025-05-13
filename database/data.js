const mongoose=require("mongoose");

const listSchema= new mongoose.Schema({
    link:String,
    ids:String,
});


const List=mongoose.model("list", listSchema);
module.exports=List;