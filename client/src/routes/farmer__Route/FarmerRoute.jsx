import React, { useContext, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import FarmerSidePanel from '../../components/farmer__Component/farmerSidePanel';
import FarmerDashboard from '../../pages/farmer__Page/farmer__Dashboard/FarmerDashboard';
import FarmerProfile from '../../pages/farmer__Page/farmer__Profile/FarmerProfile';
import FarmerProduce from '../../pages/farmer__Page/farmer__Produce/farmerProduce';
import FarmerAddProduce from '../../pages/farmer__Page/Add__Produce/FarmerAddProduce';
import { GetProduce, GetProfile } from '../../../configs/farmer_configs/fetch';
import { Socket, UserContext } from '../../../hooks/useContext/ConsumerInfo';
import {io} from 'socket.io-client'
import Notification from '../../pages/farmer__Page/Notification/Notification';
const FarmerRoute = () => {
  const [resState,setResState] =  useState(true)
  const [produce,setProduce] =  useState([])
  const [profile,setProfile] = useState([])
  const [notificationResponse,setNotificationResponse] = useState('')
  const [hideNotification,setHideNotification] = useState(true)
  const [notification,setNotification] = useState(null)
  const [menu,setMenu] =  useState('')
  const socket  = useContext(Socket)
  const userInfo =  useContext(UserContext)

  if(socket){
    socket.on('new_notification',(result) => {
      if(result){
        setHideNotification(false)
        setNotificationResponse(result)
      }
    })
  }

  const hideNotify = () => {
    setHideNotification(true)
  }

  const getprofile= async(userInfo) => {
    const results = await GetProfile(userInfo)
    console.log(results)
    if(results){
      setProfile(results)
    }else(
      setProfile([])
    )
  }
  const getNotification = () => {
    
  }
  const getproduce = async(userInfo) =>{
    const results =  await GetProduce(userInfo)
    console.log(results)
    if(results){
      setProduce(results.results)
      console.log(results.results)
      setResState(true)
    }else{
      setProduce([])
    }
  }
  console.log(produce)
  return (
    <Router>
      <input type="checkbox" id='fnavBtn'/>
      <body className='fDashboard'>
      <header>
      <main>
          <span>{menu}</span>
          <label htmlFor="navBtn" id='fBtn'></label>
        </main>
        <aside>
        <Link to={'/fM/notification'}><i className={!hideNotification ? "fa-solid fa-bell fa-bounce" : "fa-solid fa-bell"} style={!hideNotification ? {
          color: 'red',
          fontSize: '30px'
        } : {
          color: 'red',
          fontSize: '20px'
        }} onClick={() => getNotification(userInfo)}></i></Link>
          {!hideNotification && (
            <>
            <h4>New Notification</h4>
            <p>{notificationResponse}</p>
            <button onClick={hideNotify}>Hide</button>
            </>
          )}
        </aside>
      </header>
      <FarmerSidePanel  getProfile={() => getprofile(userInfo)} getProduce={() => getproduce(userInfo)}/>
      <Routes>
        <Route path="/fM/dashboard" element={<FarmerDashboard />} />
        <Route path='/fM/profile' element={<FarmerProfile state={resState} farmerProfile={profile}/>}/>
        <Route path='/fM/produce' element={<FarmerProduce state={resState} farmerProduce={produce}/>}/>
        <Route path='/fM/upload_produce' element={<FarmerAddProduce/>}/>
        <Route path=''/>
        <Route path='/fM/notification' element={<Notification/>}/>
      </Routes>
      </body>
    </Router>
  )
}

export default FarmerRoute
