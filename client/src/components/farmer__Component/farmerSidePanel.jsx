import React, { useContext,useState } from 'react'
import { Link } from 'react-router-dom'
import { Logout } from '../../../configs/default__configs/logout'
import { Socket, UserData } from '../../../hooks/useContext/ConsumerInfo'
import './farmerSidepanel.css'
import { data } from '../../../data/default/data'
const FarmerSidePanel = ({ getProduce,getProfile,menu,navBtn}) => {
  const userData =  useContext(UserData)
  const socket =  useContext(Socket)
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
            backgroundColor: 'red'
          }} />
         <h1>{userData.username}</h1>
        </figure>
      </aside>
      <main className='panel-options'>
        <ul>
            <li id='panelOption'><Link to='/fM/produce' onClick={getProduce} id='link'>Dashboard</Link></li> {/* Check produce and delete and may edit */}
            <li id='panelOption'><Link to='/fM/upload_produce' onClick={() => menu(data.addproduce)}id='link'>Add Your Produce</Link></li>
        </ul>
        <aside>
            <ul>
                <li id='panelOption'><Link to='/fM/profile' onClick={getProfile} id='link'>Profile</Link></li>
                <li id='panelOption' last='true' onClick={() => Logout(socket,userData)}>Logout</li>    
            </ul>
        </aside>
      </main>
    </nav>
    </>
  )
}

export default FarmerSidePanel
