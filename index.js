//created server
const express = require("express");
const app = express();

require("dotenv").config();

PORT = process.env.PORT || 3000;

//middleWare
app.use(express.json());

const blog = require("./routes/blog");
//mount
app.use("/api/v1",blog);

const connectDb = require("./config/database");
connectDb();

//start the server
app.listen(PORT, ()=>{
    console.log("App is running successfully");
})

//default route
app.get("/",(req,res)=>{
    res.send(`<h1>"This is HomePage"</h1>`)
})