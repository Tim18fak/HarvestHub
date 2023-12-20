import React, { useContext } from 'react'
import {Logout} from '../../../config/logout'
import { Link } from 'react-router-dom'
import './sidepanel.css'
import { Socket } from '../../../hooks/usecontext/useContext'
const SidePanel = ({dashboard,produce,profile,farmer,consumer,linkName,navbtn}) => {
  const socket = useContext(Socket)
  return (
    <>
    <nav className='admin_sidepanel'>
     <aside>
     <h3>Harvest<span>Hub</span></h3>
     <i class="fa-solid fa-x fa-beat" style={{
      color: '#0a790b'
     }} onClick={() => navbtn(false)}></i>
     </aside>
      <main>
      <ul>
        <li onClick={dashboard} style={linkName === 'dashboard'? {
          backgroundColor: 'aqua'
        } : {}}><Link link='links' to='/dashboard'>Dashboard</Link></li>
        <li onClick={produce} style={linkName === 'produce'? {
          backgroundColor: 'aqua'
        } : {}}><Link to='/product' link='links'>Produce</Link></li>

        <li onClick={consumer} style={linkName === 'consumer'? {
          backgroundColor: 'aqua'
        } : {}}><Link to='/consumer' link='links'>Consumer</Link></li>

        <li onClick={farmer} style={linkName === 'farmer'? {
          backgroundColor: 'aqua'
        } : {}}><Link to='/farmer' link='links'>Farmer</Link></li>
      </ul>
      </main>
      <aside className='aside-side-panel_options'>
        <ul>
          <li onClick={profile} style={linkName === 'profile'? {
          backgroundColor: 'aqua'
        } : {}}><Link to='/profile' link='links'>Profile</Link></li>
          <li onClick={() => Logout(socket)}><Link link='links'>Logout</Link></li>
        </ul>
      </aside>
    </nav>
    </>
  )
}

export default SidePanel