import express from 'express'
import { addPost, getPosts,getUserPosts, deletePost,updatePost } from '../controllers/postController.js'
import auth from "../middlewares/auth.js"
const router = express.Router()

router.use(express.json())

//Get all posts route
router.get ('/',getPosts )

//Get user posts route
router.get ('/user',auth, getUserPosts )

// add new post route
router.post('/',auth, addPost )

// delete post route
router.delete('/:id',auth,deletePost )

// update post route
router.put('/:id',auth,updatePost )



export {router as postsRoutes}