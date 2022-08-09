const express=require('express')
const { append } = require('express/lib/response')
const router=express.Router()
const {registerUser, loginUser, getMe}=require('../controller/userController')
const { protect }=require('../middleware/authMiddleware')

//router.post('/',(req,res)=>{res.send('Register Route')})
router.post('/',registerUser)
router.post('/login',loginUser)
router.get('/me', protect, getMe)
module.exports=router