const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const Ticket = require('../models/ticketModel')
const colors = require('colors');

//@desc Get user tickets
//@route GET/api/tickets
//@access Private
const getTickets = asyncHandler(async (req, res) => {

    //the req.user.id comes from protect
    const user = await User.findById(req.user.id)

    if (!user) {
        res.status(201)
        throw new Error('User not found')
    }
    const tickets = await Ticket.find({ user: req.user.id })
    res.status(200).json(tickets)
})

//@desc Get user tickets
//@route GET/api/ticket/:id
//@access Private
const getTicket = asyncHandler(async (req, res) => {

    //the req.user.id comes from protect
    const user = await User.findById({ _id: req.user.id })
    //console.log('REQ:', req)
    console.log('USER:', user)
    if (!user) {
        res.status(201)
        throw new Error('User not found')
    }
    const ticket = await Ticket.findById(req.params.id)

    if (!ticket) {
        res.status(404)
        throw new Error('Ticket not found')
    }
    // console.log('Get Ticket'.red)
    // console.log(colors.brightYellow(`Ticket.user._id: ${ticket.user.toString()}`))
    // console.log(colors.brightYellow(`Req.user._id ${req.user._id}`))
    // //to tell if 
    // if(ticket.user.toString() !== req.user._id.toString()){
    //     res.status(401)
    //     throw new Error('Not Authorized')
    // }
    res.status(200).json(ticket)
})


//@desc Create new ticket
//@route POST/api/tickets
//@access Private
const createTickets = asyncHandler(async (req, res) => {

    const { product, description } = req.body
    console.log('IN CREATETICKETS')
    console.log('PRODUCT:', product)
    console.log('DESCRIPTION:', description)
    if (!product || !description) {
        res.status(400)
        throw new Error('Please add a product and description')
    }

    //get user using the id in the JWT which is passed in req.user.id
    const user = await User.findById(req.user.id)

    if (!user) {
        res.status(401)
        console.log('USER NOT FOUND')
        throw new Error('User not found')
    }
    console.log('USER FOUND')
    //create ticket
    var ticket;
    try {
        ticket = await Ticket.create({
            product,
            description,
            user: user,
            status: 'new'
        })
        console.log('TICKET:', ticket)
    }
    catch (err) {
        console.log("ERROR:", err)
    }
    console.log('TICKET:', ticket)
    res.status(201).json({ ticket })
    //console.log('RES:', res)
})

//@desc Delete a ticket
//@route DELETE/api/tickets
//@access Private
const deleteTicket = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id)

    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }
    const ticket = await Ticket.findById(req.params.id)

    if (!ticket) {
        res.status(404)
        throw new Error('Ticket not found')
    }
    // if(ticket.user.toString() !== req.user.id){
    //     res.status(401)
    //     throw new Error('Not authorzed')
    // }
    await ticket.remove()
    res.status(200).json({ success: true })
})

// @desc    Update ticket
// @route   PUT /api/tickets/:id
// @access  Private
const updateTicket = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id)

    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }
    const ticket = await Ticket.findById(req.params.id)

    if (!ticket) {
        res.status(404)
        throw new Error('Ticket not found')
    }
    // if(ticket.user.toString() !== req.user.id){
    //     res.status(401)
    //     throw new Error('Not authorzed')
    // }
    const updatedTicket = await Ticket.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(200).json(updatedTicket)
})
module.exports = { getTickets, createTickets, getTicket, deleteTicket, updateTicket }