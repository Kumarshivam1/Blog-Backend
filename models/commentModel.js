//import mongoose
const mongoose = require("mongoose");

//route handler
const commentSchema = new mongoose.Schema({
    //post absically ek id ko store kar raha hoga
    post:{
        //id ko refer karna chhta hun
        type:mongoose.Schema.Types.ObjectId,
        //kiski id hogi:-
        //reference to post model
        ref:"Post",
    },
    user:{
        type:String,
        required:true,
    },
    body:{
        type:String,
        required:true,
    }

})

module.exports = mongoose.model("Comment",commentSchema)