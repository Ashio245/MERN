import express from 'express'
import {registerUser, loginUser} from '../controllers/usersController.js'

const router = express.Router()

//Register User route

router.post('/', registerUser)

//Login User route

router.post("/login", loginUser)

export  {router as usersRoutes}

