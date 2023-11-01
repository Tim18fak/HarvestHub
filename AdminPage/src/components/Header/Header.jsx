import React from 'react'
import { Link } from 'react-router-dom'
const Header = () => {
  return (
    <nav>
        <div>HarvestHub</div>
        <div>
            <ul>
                <Link to='/'><li>Home</li></Link>
                <Link to='/about'><li>About</li></Link>
                <Link to='/signin'><li>SignIN</li></Link>
            </ul>
        </div>
    </nav>
  )
}

export default Header