import React from 'react'
import { Link } from 'react-router-dom'
import { Logout } from '../../../../configs/default__configs/logout'

const ConsumerSidePanel = () => {
  return (
    <nav>
        <h2>HarvestHub</h2>
        <ul>
            <li><Link to='/cN/dashboard' >Dashboard</Link></li>
            <li><Link to='/cN/profile' >Profile</Link></li>
        </ul>
        <h4 onClick={Logout}>LogOut</h4>
    </nav>
  )
}

export default ConsumerSidePanel