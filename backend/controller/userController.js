const bcrypt = require('bcryptjs')
const User = require('../models/userModel')
const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')

//generates JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET,
        { expiresIn: '30d' })
}


// @desc    Register a new user
// @route   /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    //res.send('Register Route')
    console.log('In Register User')
    //console.log('REQ BODY:', req.body)
    const { name, email, password1 } = req.body
    console.log('Name:', name)
    console.log('Email:', email)
    console.log('Password:', password1)
    //validation
    if (!name || !email || !password1) {
        console.log('Name, email, password:', name, email, password1)
        res.status(400)
        throw new Error('Please include all fields')
    }
    //find if user already exists
    const userExists = await User.findOne({ email })
    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    }
    //Hash Password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password1, salt)

    //Create user
    const user = await User.create({ name, email, password: hashedPassword })
    if (user) {
        res.status(201)
            .json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id)
            })
    }
    else {
        res.status(400)
        throw new Error('Invalid user data')
    }
    //res.send('Register User')
})

// @desc    Login a user
// @route   /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    //console.log('REQ BODY:', req.body)
    const user = await User.findOne({ email })

    //check user and password match
    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    }
    else {
        res.status(401)
        throw new Error('Invalid Credentials')
    }
})


// @desc    Get current user
// @route   /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
    // const user = {
    //     //id: req.user._id,
    //     //email: req.user.email,
    //     //name: req.user.name,
    //     user:req.user
    //   }
    res.send('me')
    //res.status(200).json(user)
})

module.exports = {
    registerUser,
    loginUser,
    getMe
}
