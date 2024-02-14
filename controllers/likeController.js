//import models
const Post = require("../models/postModel");
const Like = require("../models/likeModel");

//like a post

exports.likePost = async (req,res)=>{
    try{
        const {post,user} = req.body;
        const like = new Like({
            post,user,
        });
        const savedLike = await like.save();

        //update post

        const updatePost = await Post.findByIdAndUpdate(post,{$push:{likes:savedLike._id}},{new:true});
        res.json({
            post:updatePost,
        })
    }
    catch(error){
        return res.status(400).json({
            error:"Error while Liking post",
        });
    }
}

//Unlike a post
exports.unlikePost = async (req,res)=>{
    try{
        const {post,like}= req.body;
        //delete in like
        const deletedLike = await Like.findOneAndDelete({post:post,_id:like});

        //update Post collection
        const updatedPost = await Post.findByIdAndUpdate(post,{$pull:{likes:deletedLike._id}},{new:true});

        res.json({
            post:updatedPost
        });

    }
    catch(error){
        return res.status(400).json({
            error:"Error while Unliking post",
        });
    }
}