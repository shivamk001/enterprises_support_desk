const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const Ticket = require('../models/ticketModel')
const Note = require('../models/noteModel')
const colors = require('colors');

//@desc Get notes for a ticket
//@route GET /api/tickets/:tickedId/notes
//@access Private
const getNotes = asyncHandler(async (req, res) => {

    //the req.user.id comes from protect
    const user = await User.findById(req.user.id)

    if (!user) {
        res.status(201)
        throw new Error('User not found')
    }
    const tickets = await Ticket.find({ user: req.user.id })

    if (tickets.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    const notes = await Note.find({ ticket: req.params.ticketId })

    res.status(200).json(tickets)
})

//@desc Create note for a ticket
//@route POST /api/tickets/:ticketId/notes
//@access Private
const addNote = asyncHandler(async (req, res) => {

    //get user using the id in the JWT which is passed in req.user.id
    console.log('IN ADDNOTE'.rainbow)
    const user = await User.findById(req.user.id)
    console.log('USER:', user)
    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }

    //get ticket
    console.log('REQ PARAMS TICKETID:', req.params)
    const ticket = await Ticket.findById(req.params.ticketId)
    console.log(colors.brightMagenta(`TICKET: , ${ticket}`))
    if (ticket.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    const note = await Note.create({
        text: req.body.text,
        isStaff: false,
        ticket: req.params.ticketId,
        user: req.user.id
    })
    console.log('NOTE:', note)
    res.status(200).json(note)
})

module.exports = { getNotes, addNote }
