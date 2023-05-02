const mongoose = require("mongoose");


const UserSchema = mongoose.Schema({
   title:String,
   email :String,
   gender :String, 
   password  :String,
   body :String,
   device :String
});

const UserModel = mongoose.model("user",UserSchema);


module.exports={
    UserModel
}