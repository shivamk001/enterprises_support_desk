import axios from 'axios'

//endpoint for ticket stuff
const API_URL = 'http://localhost:8000/api/tickets'

//create new ticket
const createTicket = async (ticketData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL, ticketData, config)
    console.log('RESPONSE DATA:', response)
    return response.data
}

//get user tickets
const getTickets = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL, config)
    console.log('GET TICKETS REPONSE DATA:', response)
    return response.data
}

//get user ticket
const getTicket = async (ticketID, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL + '/' + ticketID, config)
    console.log('GET TICKET:', response)
    return response.data
}

//Close ticket
const closeTicket = async (ticketID, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.put(API_URL + ticketID, { status: 'closed' }, config)
    return response.data
}

const ticketService = { createTicket, getTickets, getTicket, closeTicket }

export default ticketService