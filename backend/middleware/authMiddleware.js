const jwt=require('jsonwebtoken')
const asyncHandler=require('express-async-handler')
const User=require('../models/userModel')
const colors=require('colors');

const protect=asyncHandler(async(req,res,next)=>{
    let token
    console.log('In Protect')
    console.log(`REQ HEADER AUTHORIZATION: `,req.headers.authorization)
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            //get token from header
            
            token=req.headers.authorization.split(' ')[1]

            //verify the token
            const decoded=jwt.verify(token, process.env.JWT_SECRET)
            console.log(`Decoded Data from protect: ${decoded}`)

            //get user from token
            req.user=await User.findById(decoded.id).select('-password')
            console.log(colors.brightCyan(`Protect: req.user._id: ${req.user}`))
            //go to getMe function
            next()
        }
        catch(error){
            console.log(error)
            res.status(401)
            throw new Error('Not authorized')
        }
    }
    if(!token){
        res.status(401)
        throw new Error('Not Authorized')
    }
})

module.exports={protect}
