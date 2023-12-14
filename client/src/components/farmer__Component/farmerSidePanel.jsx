import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Logout } from '../../../configs/default__configs/logout'
import { Socket, UserData } from '../../../hooks/useContext/ConsumerInfo'

const FarmerSidePanel = ({ getProduce,getProfile}) => {
  const userData =  useContext(UserData)
  const socket =  useContext(Socket)
  return (
    <nav>
      <aside>
        <figure>
          <img src={userData.profileImage} alt="" width={150} height={150} style={{
            borderRadius: '50%',
            backgroundColor: 'red'
          }} />
          <figcaption>{userData.username}</figcaption>
        </figure>
      </aside>
      <main>
        <ul>
            <li><Link to='/fM/dashboard'>Dashboard</Link></li>
            <li><Link to='/fM/produce' onClick={getProduce}>Your Produce</Link></li> {/* Check produce and delete and may edit */}
            <li><Link to='/fM/upload_produce' >Add Your Produce</Link></li>
            <li><Link ></Link></li>
            <li><Link></Link></li>
        </ul>
        <aside>
            <ul>
                <li></li>
                <li><Link to='/fM/profile' onClick={getProfile}>Profile</Link></li>
                <li onClick={() => Logout(socket,userData)}>Logout</li>    
            </ul>
        </aside>
      </main>
    </nav>
  )
}

export default FarmerSidePanel
