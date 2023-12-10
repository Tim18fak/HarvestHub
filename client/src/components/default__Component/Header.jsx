import React from 'react'
import { Link } from 'react-router-dom';
import '../default__Component/style/Header.css'

const Header = () => {
  return (
    <nav>
      <div className='logo'><span className='letter-green'>Harvest</span><span className='letter-yellow'>Hub</span></div>
      
        <ul>
          <li><Link to={'/'}>Home</Link></li>
          <li><Link to={'/about'}>About</Link></li>
          <li><Link to={'/contact'}>Contact</Link></li>
        </ul>
      <button className='login-btn'><Link to={'/auth'}>Login</Link></button>
    </nav>
  )
}

export default Header
