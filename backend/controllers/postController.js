import mongoose from "mongoose"
import Post from "../models/PostModel.js"
import User from "../models/UserModel.js"
//*************************************Get all post*************************************************** */
const getPosts = async(req, res)=>{
    try {
        const posts = await Post.find()
        res.status(200).json({posts})
    } catch (error) {
        res.status(500).json({error : error.message})
    }
}


//*************************************Get user post*************************************************** */
const getUserPosts = async(req, res)=>{
//Grab the authenticated user from request body
const userPosts = await User.findById(req.user._id)


    try {
        const posts = await Post.find({user: user._id})
        res.status(200).json({userPosts})
    } catch (error) {
        res.status(500).json({error : error.message})
    }
}


//*************************************Create new post*************************************************** */
const addPost = async (req, res)=>{

    const {title, body} = req.body

//check if the fields are not empty
if(!title || !body){
    return  res.status(400).json({error : 'All fields are required'})
}

//Grab the authenticated user from request body
const user = await User.findById(req.user._id)

try{
    const post = await Post.create({user: user._id, title, body})

    res.status(200).json({success : 'Post Created', post})
} catch(error){
    res.status(500).json({error : error.message})
}

}
//*************************************Delete post*************************************************** */
const deletePost = async(req,res) =>{

//check if the ID is valid type
if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return  res.status(400).json({error : 'Invalid id'})
}

//check the post exists
const post = await Post.findById(req.params.id)
    
if (!post) {
    return  res.status(400).json({error : 'Post not found'})
}

//Check the user owns the post
const user = await User.findById(req.user._id)

if (!post.user.equals(user._id)) {
    return  res.status(401).json({error : 'not authorized'})
}


try {
    await post.deleteOne()
    return  res.status(200).json({success : 'Post was deleted'})
} catch (error) {
    res.status(500).json({error : error.message})
}
}

//*************************************Update post*************************************************** */
const updatePost = async(req,res)=>{
    const {title, body} = req.body

    //check if the fields are not empty
    if(!title || !body){
        return  res.status(400).json({error : 'All fields are required'})
    }

    //check if the ID is valid type
if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return  res.status(400).json({error : 'Invalid id'})
}

//check the post exists
const post = await Post.findById(req.params.id)
    
if (!post) {
    return  res.status(400).json({error : 'Post not found'})
}

//Check the user owns the post
const user = await User.findById(req.user._id)

if (!post.user.equals(user._id)) {
    return  res.status(401).json({error : 'not authorized'})
}


try {
    await post.updateOne({title, body})
    res.status(200).json({success : 'Post was Updated'})
} catch (error) {
    res.status(500).json({error : error.message})
}
}

export {getPosts,getUserPosts, addPost, deletePost, updatePost}
