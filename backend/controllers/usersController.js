import User from '../models/UserModel.js'
import bcrypt from 'bcryptjs'
import 'dotenv/config.js'
import jwt from'jsonwebtoken'


//*************************************Creating JWT token*************************************************** */
const createToken = (_id) =>{
  return jwt.sign({_id}, process.env.SECRET, {expiresIn: '100000000000000000000000d'})
}

//*************************************User Register*************************************************** */

const registerUser = async (req,res)=>{
    //Grab data from request body
    const {email, password} = req.body;


    //Check if the fields are not empty
    if (!email || !password) {
      return res.status(400).json({error: "all fields are required"})  
    }

    //Check if email already exist
    const exist = await User.findOne({email})
    
if (exist) {
  return res.status(400).json({error: "Email is already taken"}) 
}

//Hash the password
const salt = await bcrypt.genSalt()
const hashed = await bcrypt.hash(password, salt)


    try {
      //Register the user
       const user = await User.create({email, password : hashed})
       //Create JSON web token
       const token = createToken(user._id)
       //Sending the response
       res.status(200).json({email,token})
    } catch (error) {
       res.status(500).json({error: error.message}) 
    }
}

//*************************************Login Register*************************************************** */
const loginUser = async(req,res)=>{
    //Grab data from request body
    const {email, password} = req.body;


    //Check if the fields are not empty
    if (!email || !password) {
      return res.status(400).json({error: "all fields are required"})  
    }

    //Check if email already exist
    const user = await User.findOne({email})
    
if (!user) {
  return res.status(400).json({error: "Incorrect email"}) 
}


//Check password
const match = await bcrypt.compare(password, user.password)
if (!match) {
  return res.status(400).json({error: "Incorrect password"}) 
}

try {
   //Create JSON web token
   const token = createToken(user._id)

  res.status(200).json({email,token})
} catch (error) {
  res.status(500).json({error: error.message}) 
}





}

export {registerUser, loginUser}