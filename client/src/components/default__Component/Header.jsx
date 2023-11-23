import React from 'react'
import { Link } from 'react-router-dom';
const Header = () => {
  return (
    <nav>
      <h3>HarvestHub</h3>
      <h3><Link to={'/'}>Home</Link></h3>
      <h3>Get Started</h3>
    </nav>
  )
}

export default Header
