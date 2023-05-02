const mongoose = require("mongoose");


const PostSchema = mongoose.Schema({
   title:String,
   email :String,
   gender :String, 
   password  :String
});


const PostModel = mongoose.model("post",PostSchema);


module.exports={
    PostModel
}