import express from 'express'
import { addPost, getPosts, deletePost,updatePost } from '../controllers/postController.js'

const router = express.Router()

router.use(express.json())

//Get all posts route
router.get ('/',getPosts )


// add new post route
router.post('/',addPost )

// delete post route
router.delete('/:id',deletePost )

// update post route
router.put('/:id',updatePost )



export {router as postsRoutes}