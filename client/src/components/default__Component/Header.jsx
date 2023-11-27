import React from 'react'
import { Link } from 'react-router-dom';
const Header = () => {
  return (
    <nav>
      <h3>HarvestHub</h3>
        <ul>
          <li><Link to={'/'}>Home</Link></li>
          <li><Link to={'/about'}>About</Link></li>
          <li><Link to={'/contact'}>Contact</Link></li>
        </ul>
      <h3><Link to={'/auth'}>Get Started</Link></h3>
    </nav>
  )
}

export default Header
