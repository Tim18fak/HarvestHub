import React from 'react'
import { Link } from 'react-router-dom';
import './header.css'
const Header = () => {
  return (
    <>
    <input type="checkbox" id='checkbox' name='checkbox' />
    <header>
      <h3>HarvestHub</h3>
      <label htmlFor="checkbox" id='navBtn' >
      </label>
    </header>
    <nav>
        <ul>
          <li><Link to={'/'}  id='links'>Home <span></span></Link></li>
          <li><Link to={'/about'}  id='links'>About <span></span></Link></li>
          <li><Link to={'/contact'} id='links'>Contact <span></span></Link></li>
        </ul>
      <h3><Link to={'/auth'} id='get-started'>Get Started <span></span></Link></h3>
    </nav>
    </>
  )
}

export default Header
