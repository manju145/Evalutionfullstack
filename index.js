const express = require("express");
const {connection} = require("./db");
const cors = require("cors");
const { userRouter } = require("./routes/userRoutes");
const { postRouter } = require("./routes/postRouter");
const { checker } = require("./middlewares/checker");
// require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());


app.get("/",(req,res)=>{
res.status(200).send("Home");
});


app.use("/users",userRouter);
app.use(checker);
app.use("/posts",postRouter);



app.listen(8080,async()=>{
    try{
        await connection;
        console.log("Connection with db");
    }catch(err){
        console.log("server is running at port 8080");
    }
})
