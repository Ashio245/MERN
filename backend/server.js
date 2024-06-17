import express from 'express'
import { postsRoutes } from './routes/postsroutes.js'

const app = express()

app.use('/api/posts', postsRoutes)

app.listen(4000, 'localhost', ()=>console.log('listening to port 4000'))