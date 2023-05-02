const jwt = require("jsonwebtoken");

const checker = (req,res, next)=>{
    const token = req.headers.authorization;
    console.log(token);
    if(token){
        try{
            const decoded = jwt.verify(token,"bruce");
            req.body.userID = decoded.userID;
            console.log(decoded);
            next();
        }catch(err){
            req.status(400).send({"msg":"Unauthorized"});
        }
    }else{
        req.status(400).send({"msg":"Unauthorized"});
    }
}

module.exports={
    checker
}