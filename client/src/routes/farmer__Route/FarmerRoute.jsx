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
import { data } from '../../../data/default/data';
const FarmerRoute = () => {
  const [resState,setResState] =  useState(true)
  const [produce,setProduce] =  useState([])
  const [profile,setProfile] = useState([])
  const [notificationResponse,setNotificationResponse] = useState('')
  const [hideNotification,setHideNotification] = useState(true)
  const [notification,setNotification] = useState(null)
  const [navBtn,setNavBtn] = useState(false)
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
    setMenu(data.profileMenu)
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
    setMenu(data.getProduce)
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
  /*  */
  const navbtn = () => {
    setNavBtn(!navBtn)
  }
  console.log(produce)
  return (
    <Router>
      <input type="checkbox"  id='navBtn' onChange={navbtn} />
      <body className='dashboard'>
      <header className='dashboard_header'>
      <main>
          <span><i class="fa-solid fa-house" style={{
            color: 'brown'
          }}></i> {menu}</span>
          <label htmlFor="navBtn" id='btn'></label>
        </main>
        <aside>
        <ul>
          <li>
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
          </li>
          <li>Set</li>
        </ul>
        </aside>
      </header>
      <section className='body' id='header_body'>
          <nav  className='side_panel'>
          <FarmerSidePanel  getProfile={() => getprofile(userInfo)} getProduce={() => getproduce(userInfo)}menu={setMenu}  navBtn={navBtn}/> 
          </nav>
      <main className='main_body'>
      <Routes>
        <Route path='/fM/profile' element={<FarmerProfile state={resState} farmerProfile={profile}/>}/>
        <Route path='/fM/produce' element={<FarmerProduce state={resState} farmerProduce={produce} menu={navBtn}/>}/>
        <Route path='/fM/upload_produce' element={<FarmerAddProduce menu={setMenu}/>}/>
        <Route path='/fM/notification' element={<Notification/>}/>
      </Routes>
      </main>
      </section>
      </body>
    </Router>
  )
}

export default FarmerRoute
