import express from 'express'
import { postsRoutes } from './routes/postsRoutes.js'
import { usersRoutes } from './routes/usersRoutes.js'
import mongoose from 'mongoose'

const app = express()
app.use(express.json())

app.use('/api/posts', postsRoutes)
app.use('/api/users', usersRoutes)


mongoose.connect("mongodb://localhost:27017/mern")
.then(()=>{ console.log('db connected successfully');
app.listen(4000, 'localhost', ()=>console.log('listening to port 4000'))
})

.catch(err => console.log(err))

