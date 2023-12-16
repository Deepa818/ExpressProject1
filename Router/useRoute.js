const express=require('express')
const { registerUser,  currentUser, loginUser } = require('../Controller/userController')
const userRoute=express.Router()

userRoute.get('/',currentUser)
userRoute.post('/register',registerUser)
userRoute.post('/login',loginUser)


module.exports=userRoute