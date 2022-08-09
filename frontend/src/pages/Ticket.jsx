import React from 'react'
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Modal from 'react-modal';
import { getTicket, /*reset,*/ closeTicket } from "../features/tickets/ticketSlice";
import { getNotes, createNote, reset as noteReset } from "../features/notes/noteSlice";
import NoteItem from '../components/NoteItem';
import { Navigate, useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from "../components/Spinner";
import { toast } from 'react-toastify';
import { FaPlus } from 'react-icons/fa';

const customStyles = {
    content: {
        width: '600px',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        position: 'relative',
    },
}

Modal.setAppElement('#root');

function Ticket() {
    const { ticket, isLoading, /*isSuccess,*/ isError, message } = useSelector((state) => state.ticket)
    console.log('Ticket:', ticket)
    const params = useParams()
    const ticketID = params.ticketId
    console.log('PARAMS:', params)
    console.log('TickedID:', ticketID)
    const { notes, isLoading: noteIsLoading } = useSelector((state) => state.note)

    const dispatch = useDispatch()


    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [noteText, setNoteText] = useState('')

    useEffect(() => {
        if (isError)
            toast.error(message)
        dispatch(getTicket(ticketID))
        dispatch(getNotes(ticketID))
        //eslint-disable-next-line
    }, [isError, message, ticketID])

    //close ticket
    const onTicketClose = () => {
        dispatch(closeTicket(ticketID))
        toast.success('Ticket Closed')
        Navigate('/tickets')
    }

    //open/close modal
    const openModal = () => setModalIsOpen(true)
    const closeModal = () => setModalIsOpen(false)

    //create note submit
    const onNoteSubmit = (e) => {
        e.preventDefault()
        console.log('NOTE SUBMIT')
        console.log('ONNOTESUBMIT TICKETID:', ticketID)
        dispatch(createNote({ noteText, ticketID }))
        closeModal()
    }

    if (isLoading /*|| noteIsLoading*/) return <Spinner />

    if (isError) return <h3>Something went wrong!</h3>

    return (
        <div className='ticket-page'>
            <header className='ticket-header'>
                <BackButton url='/' />
                <h2>
                    Ticket ID: {ticket._id}
                    <span className={`status status-${ticket.status}`}>
                        {ticket.status}
                    </span>
                </h2>
                <h3>
                    Date Submitted: {new Date(ticket.createdAt).toLocaleString('en-US')}
                </h3>
                <hr />
                <div className="ticket-desc">
                    <h3>Description of Issue</h3>
                    <p>{ticket.description}</p>
                </div>
                <h2>Notes</h2>
            </header>
            {ticket.status !== 'closed' && (
                <button className='btn' onClick={openModal}><FaPlus />Add Note</button>
            )}

            <Modal isOpen={modalIsOpen} onRequestClose={closeModal}
                style={customStyles}
                contentLabel='Add Note'>
                <h2>Add Note</h2>
                <button className='btn-close' onClick={closeModal}>
                    X
                </button>
                <form onSubmit={onNoteSubmit}>
                    <div className='form-group'>
                        <textarea name='noteText'
                            id='noteText'
                            className='form-control'
                            placeholder='Note Text'
                            value={noteText}
                            onChange={(e) => setNoteText(e.target.value)}>
                        </textarea>
                    </div>
                    <div className="form-group">
                        <button className='btn' type='submit'>
                            Submit
                        </button>
                    </div>
                </form>
            </Modal>
            {notes.map((note) => (<NoteItem key={note._id} note={note} />))}
            {ticket.status !== 'closed' && (
                <button className='btn btn-block btn-danger' onClick={onTicketClose}>
                    Close Ticket
                </button>
            )}
        </div>
    )
}

export default Ticket