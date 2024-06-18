import express from 'express'
import { postsRoutes } from './routes/postsroutes.js'
import mongoose from 'mongoose'

const app = express()

app.use('/api/posts', postsRoutes)


mongoose.connect("mongodb://localhost:27017/mern").then(()=>{ console.log('db connected successfully');
app.listen(4000, 'localhost', ()=>console.log('listening to port 4000'))
})

.catch(err => console.log(err))

