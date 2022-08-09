import React from 'react'
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTickets, reset } from "../features/tickets/ticketSlice";
import BackButton from '../components/BackButton';
import Spinner from "../components/Spinner";

function Tickets() {
    const { tickets, isLoading, isSuccess } = useSelector((state) => state.ticket)

    const dispatch = useDispatch()

    useEffect(() => {
        if (isSuccess) {
            console.log('Tickets:', tickets)
            //dispatch(reset())
        }
    })

    useEffect(() => {
        dispatch(getTickets())
    }, [dispatch])

    if (isLoading) {
        return <Spinner />
    }
    console.log('Tickets:', tickets)
    return (

        <>
            <BackButton url='/' />
            <section className='heading'>
                <h1>Tickets</h1>
            </section>
            <div className='ticket-page'>
                {tickets.map(ticket =>
                    <header className='ticket-header'>
                        <h2>
                            Ticket ID: {ticket._id}
                            <span className={`status status-${ticket.status}`}>
                                {ticket.status}
                            </span>
                        </h2>
                        <h2>
                            Product: {ticket.product}
                        </h2>
                        <h3>
                            Date Submitted: {new Date(ticket.createdAt).toLocaleString('en-US')}
                        </h3>
                        <hr />
                        <div className="ticket-desc">
                            <h3>Description of Issue</h3>
                            <p>{ticket.description}</p>
                        </div>
                    </header>
                )}
            </div>


        </>
    )
}

export default Tickets;