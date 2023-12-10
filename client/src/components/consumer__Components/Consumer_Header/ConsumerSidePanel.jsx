import React from 'react'
import { Link } from 'react-router-dom'
import Cookies from 'universal-cookie'
import { Logout } from '../../../../configs/default__configs/logout'

const cookie =  new Cookies()

const ConsumerSidePanel = ({bookMrk,profile,message}) => {
 
  return (
    <nav>
        <h2>HarvestHub</h2>
        <ul>
            <li><Link to='/cN/dashboard' >Dashboard</Link></li>
            <li><Link to='/cN/profile' onClick={profile} >Profile</Link></li>
            <li><Link to='/cN/bokmarks' onClick={bookMrk}>Saved</Link></li>
            <li><Link to='cN/message' onClick={message}>Message</Link></li>
        </ul>
        <h4 onClick={Logout}>LogOut</h4>
    </nav>
  )
}

export default ConsumerSidePanel
