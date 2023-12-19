import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../default__Component/style/Header.css';
import '../default__Component/style/Header_Media_Queries.css';

const Header = () => {
  
  const [menuStatus, setMenuStatus] = useState(false);

  const toggleMenu = () => {
    setMenuStatus(!menuStatus); // Inversez la valeur de menuStatus
  };

  let classMenu = menuStatus ? ' element-nav-d-block':' element-nav-d-none'; //false to hide mobile menu 

  return (
    <>
      <nav>
        <div className='logo'><span className='letter-green'>Harvest</span><span className='letter-yellow'>Hub</span></div>
        
          <ul className="element-not-mobile">
            <li><Link to={'/'}>Home</Link></li>
            <li><Link to={'/about'}>About</Link></li>
            <li><Link to={'/contact'}>Contact</Link></li>
          </ul>
        <button className='login-btn element-not-mobile'><Link to={'/auth'}>Login</Link></button>
        <button className="menu-btn" onClick={toggleMenu}>
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 6H20M4 12H20M4 18H20" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
        </button>
        
        <div className={"menu-overlay"+classMenu} onClick={toggleMenu}></div>
        <div className={"menu"+classMenu}>
          <div className="menu-container">
            <ul>
              <li><Link to={'/'}>Home</Link></li>
              <li><Link to={'/about'}>About</Link></li>
              <li><Link to={'/contact'}>Contact</Link></li>
            </ul>
            <button className='login-btn'><Link to={'/auth'}>Login</Link></button>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Header
