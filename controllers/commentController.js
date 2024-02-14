//import model
const Post = require("../models/postModel");
const Comment = require("../models/commentModel");

//Bussiness logic

//async kyuki hum main program flow ko disturb nhi karna chahte hai
exports.createComment = async (req, res) => {
  try {
    //fetch data from request ki body
    const { post, user, body } = req.body;
    //create a comment object
    // const comment = new Comment({
    //   post,
    //   user,
    //   body,
    // });
    //save the new comment in DB
    //by default id banegi
    // const savedComment = await comment.save();

    const response = Comment.create({post,user,body});

    //find the post by ID, add new comment to its comment array
    //push operator = to update an entry
    //new: true = return me updated doc
    //id of comment can be accessed by using savedComment._id
    const updatedPost = await Post.findByIdAndUpdate(
      post,
      { $push: { comments: response._id } },
      { new: true }
    )
      .populate("comments") //populate the comments array with comment documents [actuall commemt ajati hai]
      .exec();

    res.json({
      post: updatedPost,
    });
  } catch (err) {
    return res.status(500).json({
      error: "error while creating comment",
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

  }
}
