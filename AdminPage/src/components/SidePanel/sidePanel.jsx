import React, { useContext } from 'react'
import {Logout} from '../../../config/logout'
import { Link } from 'react-router-dom'
import './sidepanel.css'
import { Socket } from '../../../hooks/usecontext/useContext'
const SidePanel = ({dashboard,produce,profile,farmer,consumer}) => {
  const socket = useContext(Socket)
  return (
    <>
    <nav className='admin_sidepanel'>
      <main>
      <ul>
        <li onClick={dashboard}><Link to='/dashboard'>Dashboard</Link></li>
        <li onClick={produce}><Link to='/product'>Produce</Link></li>
        <li onClick={consumer}><Link to='/consumer'>Consumer</Link></li>
        <li onClick={farmer}><Link to='/farmer'>Farmer</Link></li>
      </ul>
      </main>
      <aside>
        <ul>
          <li onClick={profile}><Link to='/profile'>Profile</Link></li>
          <li onClick={() => Logout(socket)}><Link>Logout</Link></li>
        </ul>
      </aside>
    </nav>
    </>
  )
}

export default SidePanel