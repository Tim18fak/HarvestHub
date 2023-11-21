import React from 'react'
import { Link } from 'react-router-dom'
import './header.css'
const Header = () => {
  return (
    <nav>
        <div>HarvestHub</div>
        <div>
            <ul>
                <Link to='/'><li>Home</li></Link>
                <Link to='/about'><li>About</li></Link>
            </ul>
        </div>
        <div>
        <Link to='/signin'><h2>Login</h2></Link>
        </div>
    </nav>
  )
}

export default Header