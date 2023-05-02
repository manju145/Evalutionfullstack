const express = require("express");
const {PostModel} = require("../models/postModel");
const { UserModel } = require("../models/userModel");
const postRouter= express.Router();


postRouter.get("/",async(req,res)=>{
    const UserID = req.body;
    try{
        const posts = await PostModel.find({UserID});
        res.status(200).send(posts);
    }catch(error){
        res.status(400).send({msg:error.message})

    }
})

postRouter.post("/add",async(req,res)=>{
    const payload = req.body;
    try{
        const post = await PostModel.find(payload);
        await post.save();
        res.status(200).send({msg:"a new post has posted"});
    }catch(error){
        res.status(400).send({msg:error.message})
        
    }
});


postRouter.patch("/update/:userID",async(req,res)=>{
    const userID = req.params;
    try{
       await   UserModel.findByIdAndUpdate({_id,userID});
       
        res.status(200).send({msg:`user ${userID} has been updated`});
    }catch(error){
        res.status(400).send({msg:error.message});
        
    }
});

postRouter.delete("/update/:userID",async(req,res)=>{
    const userID = req.params;
    try{
       await   UserModel.findByIdAndDelete({_id,userID});
       
        res.status(200).send({msg:`user ${userID} has been deleted`});
    }catch(error){
        res.status(400).send({msg:error.message});
        
    }
});

module.exports={
    postRouter
}