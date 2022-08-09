import React from 'react'
//import Header from '../components/Header'
import { Link } from 'react-router-dom'
import { FaQuestionCircle, FaTicketAlt } from 'react-icons/fa'
import Header from '../components/Header'
function Home() {
  return (
    <>
      <Header heading='Support Desk' />
      <section className='heading'>
        <h1>What do you need help with?</h1>
        <p>Please choose an option below</p>
        <Link to='/new-ticket' className='btn btn-reverse btn-block'>
          <FaQuestionCircle />Create New Ticket
        </Link>
        <Link to='/tickets' className='btn btn-block'>
          <FaTicketAlt />View My Tickets
        </Link>
      </section>
    </>
  )
}

export default Home