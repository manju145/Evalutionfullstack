
const validator = (req,res, next)=>{
    const method = req.method;
   const {email,password} = req.body
    if(method==="POST"){
        if(typeof email==="string" && typeof password=== "string"){
next();
        }else{
            req.status(400).send({msg:error.message}); 
        }
           }else{
            next();
    }
};

module.exports={
    validator
}