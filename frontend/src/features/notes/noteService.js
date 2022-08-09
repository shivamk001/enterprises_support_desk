import axios from 'axios'

//endpoint for ticket stuff
const API_URL = 'http://localhost:8000/api/tickets'

//get ticket notes
const getNotes = async (ticketId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL + '/' + ticketId + '/notes', config)
    return response.data
}

const createNote = async (noteText, ticketId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    console.log('NOTES URL:', API_URL)
    console.log('TICKEDID:', ticketId)
    const response = await axios.post(API_URL + '/' + ticketId + '/notes', { text: noteText }, config)
    console.log('NOTES RESPONSE DATA:', response.data)
    return response.data
}

const noteService = { getNotes, createNote }

export default noteService