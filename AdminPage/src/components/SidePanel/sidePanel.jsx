import React from 'react'
import { Link } from 'react-router-dom'
import {Logout} from '../../../config/logout'
import './sidepanel.css'
const SidePanel = () => {
  return (
    <>
    <nav className='admin_sidepanel'>
      <main>
      <ul>
        <li><Link to='/dashboard'>Dashboard</Link></li>
        <li><Link to='/product'>Produce</Link></li>
        <li><Link to='/consumer'>Consumer</Link></li>
        <li><Link to='/farmer'>Farmer</Link></li>
      </ul>
      </main>
      <aside>
        <ul>
          <li><Link to='/profile'>Profile</Link></li>
          <li onClick={Logout}><Link>Logout</Link></li>
        </ul>
      </aside>
    </nav>
    </>
  )
}

export default SidePanel