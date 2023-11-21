import React from 'react'
import { Link } from 'react-router-dom'
import {Logout} from '../../../config/logout'
const SidePanel = () => {
  return (
    <>
    <nav>
        <h3><Link to='/dashboard'>Dashboard</Link></h3>
        <h3><Link to=''></Link></h3>
        <h3><Link to='product'>Find Product</Link></h3>
        <h3><Link to='profile'>Profile</Link></h3>
        <h3 onClick={Logout}>Logout</h3>
    </nav>
    </>
  )
}

export default SidePanel