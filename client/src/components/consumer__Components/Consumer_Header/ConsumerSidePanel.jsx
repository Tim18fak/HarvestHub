import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import Cookies from 'universal-cookie'
import { Logout } from '../../../../configs/default__configs/logout'
import './consumersidepanel.css'
import { UserData } from '../../../../hooks/useContext/ConsumerInfo'
const cookie =  new Cookies()


const ConsumerSidePanel = ({bookMrk,profile,message,review}) => {
  const userData =  useContext(UserData)

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
        <ul>
            <li><Link id='side_panel-list' to='/cN/dashboard' ><span><i class="fa-solid fa-user"></i></span> Dashboard</Link></li>
            
            <li><Link id='side_panel-list' to='/cN/profile' onClick={profile} >Profile</Link></li>
            <li><Link id='side_panel-list' to='/cN/bokmarks' onClick={bookMrk}>Saved</Link></li>
            <li><Link id='side_panel-list' to='cN/message' onClick={review}>Reviewed</Link></li>
        </ul>
        <h4 onClick={Logout}>LogOut</h4>
    </nav>
  )
}

export default ConsumerSidePanel
