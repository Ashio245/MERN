import express from 'express'

const router = express.Router()

router.use(express.json())

router.get('/about', (req, res)=>{
    res.status(200).json({msg : 'I miss you'})
})

router.post('/', (req, res)=>{

    console.log(req.body)

    res.status(200).json({msg : 'I miss you too'})
})


export {router as postsRoutes}