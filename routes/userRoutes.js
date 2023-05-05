const express = require("express");
const jwt = require("jsonwebtoken");
const {UserModel} = require("../models/userModel");
const {validator} = require("../middlewares/validator");
const bcrypt = require("bcrypt");

const userRouter = express.Router();
userRouter.use(validator);

userRouter.get("/",async(req,res)=>{
    try{
        const user = await UserModel.find();
        res.status(200).send(user);
    }catch(error){
        res.status(400).send({msg:error.message})

    }
})

userRouter.post("/register",async(req,res)=>{
    const {title, email, gender, password, body,device}=req.body;
    try{
        bcrypt.hash(password,5,async(err,hash)=>{
            let user = new UserModel({
                title, email, gender, password, body,device
            });
            await user.save();
            res.status(200).send({msg:"a new user has added"});  
        });
            }catch(error){
        res.status(400).send({msg:error.message})
        
    }
});


userRouter.post("/login",async(req,res)=>{
    const { email, password}=req.body;
    try{
       let user = await   UserModel.find({email});
       if(user.length>0){
        const passwordMatch = await bcrypt.compare(password, user[0].password);
        if(passwordMatch){
            const token = jwt.sign(
               { 
                userID:user[0]._id,
                exp: Math.floor(Date.now()/1000)+60*60,
            },
            "bruce"
            );
            res.status(200).send({msg:"Login successfull",token: token});
            
        }else{
            res.status(400).send({msg: "Wrong Credentials"});
        }
       }else{
        res.status(400).send({msg: "Wrong Credentials....."});
       }
           }catch(error){
            res.status(400).send({msg:error.message});
            
        }
});

userRouter.post("/update/:userID",async(req,res)=>{
    const userID = req.params;
    try{
       await   UserModel.findByIdAndUpdate({_id,userID});
       
        res.status(200).send({msg:`user ${userID} has been updated`});
    }catch(error){
        res.status(400).send({msg:error.message});
        
    }
});

userRouter.delete("/delete/:userID",async(req,res)=>{
    const userID = req.params;
    try{
       await   UserModel.findByIdAndDelete({_id,userID});
       
        res.status(200).send({msg:`user ${userID} has been deleted`});
    }catch(error){
        res.status(400).send({msg:error.message});
        
    }
});


userRouter.get("/update/:userID",async(req,res)=>{
    const userID = req.params;
    try{
   let user  =  await   UserModel.findById({_id:userID});
       
        res.status(200).send(user);
    }catch(error){
        res.status(400).send({msg:error.message});
        
    }
});
module.exports={
    userRouter
}