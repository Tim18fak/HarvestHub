import React from 'react'
import { Link } from 'react-router-dom'
import { Logout } from '../../../configs/default__configs/logout'

const FarmerSidePanel = ({ getProduce,getProfile}) => {
  
  return (
    <nav>
        <h3>HarvestHub</h3>
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
                <li onClick={Logout}>Logout</li>    
            </ul>
        </aside>
      </main>
    </nav>
  )
}

export default FarmerSidePanel
