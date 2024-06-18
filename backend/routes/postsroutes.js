import express from 'express'
import Post from '../models/PostModel.js'

const router = express.Router()

router.use(express.json())

//*************************************Get all post*************************************************** */
router.get ('/', async(req, res)=>{
    try {
        const posts = await Post.find()
        res.status(200).json({posts})
    } catch (error) {
        res.status(500).json({error : error.message})
    }
})


//*************************************Create new post*************************************************** */
router.post('/', async (req, res)=>{

    const {title, body} = req.body

if(!title || !body){
    return  res.status(400).json({error : 'All fields are required'})
}

try{
    const post = await Post.create({title, body})

    res.status(200).json({success : 'Post Created', post})
} catch(error){
    res.status(500).json({error : error.message})
}

    


})


export {router as postsRoutes}