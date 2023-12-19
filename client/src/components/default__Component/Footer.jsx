import React from 'react'
import { Link } from 'react-router-dom';
import '../default__Component/style/Footer.css'

const Footer = () => {
  return (
    <div className='footer'>
      <div className="footer-up">
        <div className="left">
          <div className='logo'><span className='letter-green'>Harvest</span><span className='letter-yellow'>Hub</span></div>
          <div>FarmHub: Connect. Grow. Thrive</div>
        </div>
        <div className="site-map">
          <div className="title-map">Site Map</div>
          <div className="map">
            <div><Link to={'/'}>Home</Link></div>
            <div><Link to={'/about'}>About Us</Link></div>
            <div><Link to={'/contact'}>Contact Us</Link></div>
          </div>
        </div>
        <div className="site-social-network">
          <div className="title-social-network">Follow Us</div>
          <div className="social-network">
            <div className="item"></div>
            <div className="item"></div>
            <div className="item"></div>
            <div className="item"></div>
          </div>
        </div>
      </div>
      <div className="footer-down">
        <div className="title">Get Information About Us</div>
        <div className="sub-title">Looking for more,subscribe to our mailing list</div>
        <div className="input-container">
          <div className="input">
            <input type="email" name="" id="" placeholder='Email'/>
            <button>Subscribe</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer