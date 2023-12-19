import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import Cookies from 'universal-cookie'
import { Logout } from '../../../../configs/default__configs/logout'
import './consumersidepanel.css'
import { Socket, UserData } from '../../../../hooks/useContext/ConsumerInfo'
const cookie =  new Cookies()


const ConsumerSidePanel = ({bookMrk,profile,message,review,menu,navBtn,NavBtn}) => {
  const userData =  useContext(UserData)
  const socket = useContext(Socket)
  
  const smallScreennavBtn = () => {
   NavBtn(false)
  }
  return (
    <>
    <input type="checkbox" checked={navBtn}  id='navBtn' className='input'/>
     <nav className='client-sidepanel'>
       <div>
       <h3>Harvest<span>Hub</span></h3>
       <label htmlFor="navBtn" onClick={smallScreennavBtn}><i class="fa-solid fa-xmark fa-beat-fade" style={{
        color: "#faf7f7"
       }}></i></label>
       </div>
          <aside>
        <figure> 
          <img src={userData.profileImage} alt="" width={150} height={150} style={{
            borderRadius: '50%',
            backgroundColor: 'white'
          }} />
          <h1>{userData.username}</h1>
        </figure>
      </aside>
        <ul className='sidepanel-component'>
            <li><Link id='side_panel-list' to='/cN/dashboard' onClick={() => menu('home / dashboard')}>
            <i class="fa-solid fa-house" style={{
              color: "#0a790b"
            }}></i><span className='side-panel-component'>Dashboard</span></Link></li>
            
            <li><Link id='side_panel-list' to='/cN/profile' onClick={() => menu('home / Profile')} ><i class="fa-solid fa-user" style={{
              color: "#0a790b"
            }}></i><span>Profile</span></Link></li>
            <li><Link id='side_panel-list' to='/cN/bokmarks' onClick={bookMrk}><i class="fa-solid fa-cart-shopping" style={{
              color: "#0a790b"
            }}></i><span>Cart</span></Link></li>
            <li className='review'><Link id='side_panel-list' to='cN/message' onClick={review}><i class="fa-solid fa-star" style={{
              color: "#0a790b"
            }}></i><i class="fa-solid fa-star" style={{
              color: "#0a790b"
            }}></i><i class="fa-solid fa-star" style={{
              color: "#0a790b"
            }}></i><span>Reviewed</span></Link></li>
            <h4 onClick={() => Logout(socket,userData)}><i class="fa-solid fa-right-from-bracket fa-rotate-180" style={{
              color: "#0a790b"
            }}></i>
            <p className='logout' onClick={() => Logout(socket,userData)}>Logout</p>
            </h4>
        </ul>
    </nav>
    </>
  )
}

export default ConsumerSidePanel
