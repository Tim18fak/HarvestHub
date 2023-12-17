import React from 'react'
import { Link } from 'react-router-dom';
import './header.css'
const Header = () => {
  return (
    <>
    <input type="checkbox" id='checkbox' name='checkbox' />
    <header className='header___homepage'>
    <aside>
    
    <label htmlFor="checkbox" id='navBtn' >
      </label>
      <h3>HarvestHub</h3>
    </aside>
    <nav>
          <li><Link to={'/'}  id='links'>Home <span></span></Link></li>
          <li><Link to={'/about'}  id='links'>Company <span></span></Link></li>
          <li><Link to={'/contact'} id='links'>Contact <span></span></Link></li>
      <h3><Link to={'/auth'} id='get-started'>Get Started <span></span></Link></h3>
    </nav>
    <aside>
    </aside>
    </header>
    </>
  )
}


export default Header
