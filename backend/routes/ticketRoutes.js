const express = require('express')
const { append } = require('express/lib/response')

const { getTickets, createTickets, getTicket, deleteTicket, updateTicket } = require('../controller/ticketController')
const { protect } = require('../middleware/authMiddleware')
const noteRouter = require('./noteRoutes')
const router = express.Router({ mergeParams: true })

router.use('/:ticketId/notes', (req, res, next) => {
        console.log('Request URL:', req.originalUrl)
        console.log('Request Type:', req.method)
        console.log('REQ BODY:', req.body)
        console.log('REQ PARAMS:', req.params)
        console.log('REQ USER:', req.user)
        console.log('REQ QUERY', req.query)
        req.params = req.params
        next()
}, noteRouter)
router.route('/')
        .post(protect, createTickets)
        .get(protect, getTickets)
router.route('/:id')
        .get(protect, getTicket)
        .put(protect, updateTicket)
        .delete(protect, deleteTicket)
module.exports = router