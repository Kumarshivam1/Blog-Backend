const Post = require("../models/postModel");

exports.createPost = async (req,res) =>{
    try{
        //data fetch
       const {title, body} = req.body;
       //object banaya
       const response = Post.create({title,body});

       res.json({
        post: response,
       });


    }
    catch(error){
        return res.status(400).json({
            error:"error while creating post"
        });
    }
};

exports.getAllPosts = async (req,res) =>{
    try{
        const posts = await Post.find().populate("likes").populate("comments").exec();
        res.json({
            posts,
        })
    }
    catch(error){
        return res.status(400).json({
            error:"Error while fetching post"
        })
    }
}