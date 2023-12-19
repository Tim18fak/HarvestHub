import React, { useContext, useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SidePanel from '../../components/SidePanel/sidePanel'
import Profile from '../Profile/Profile'
import Dashboard1 from '../MainPanel/Dashboard';
import Product from '../DatabaseProduct/Product';
import {io} from 'socket.io-client';
import Cookies from 'universal-cookie';
import Consumer from '../Consumer/Consumer';
import Farmer from '../Farmer/Farmer';
import './dashboard.css'
import { Socket, adminInfo} from '../../../hooks/usecontext/useContext';
import { getAllConsumer, getFarmer, getFarmerProduce } from '../../../config/getAllConsumer';
import { admin } from '../../../data/adminData';
const cookie  = new Cookies()

const Dashboard = () => {
  const [adminData,setAdminData] = useState('')
  const [socket,setSocket] = useState(null)
  const [state,setState] = useState(true)
  const [HHFarmer,setHHFarmer] = useState([])
  const [HHProduce,setHHProduce] = useState([])
  const [HHConsumer,setHHConsumer] = useState([])
  const [adminProfile,setAdminProfile] =  useState([])
  const [linkName,setLinkName] =  useState('dashboard')
  const [menu,setMenu] = useState("dashboard")
  const [checked,setCheck] =  useState(false)
  useEffect(() => {
    const admin =  cookie.getAll()
    if(admin){
      setAdminData(admin)
      const socket =  io('http://localhost',{
        reconnection: true,          // Enable reconnection
  reconnectionAttempts: 5,     // Number of attempts before giving up
  reconnectionDelay: 1000,     // Time to wait between reconnection attempts (in milliseconds)
  reconnectionDelayMax: 5000, 
      })
      socket.on('connect', () => {
        console.log('Connected to the server');
      });
      socket.emit('activeAdmin',{admin})
      socket.emit('adminLogin')
      setSocket(socket)
    }
  },[])
  const Dashboard = () => {
    console.log('hello')
    setMenu('/ dashboard')
    setLinkName('dashboard')
    if(socket){
      socket.emit('adminLogin')
        window.location.reload()
    }
  }
  const getProduce = async() => {
    setLinkName('produce')
    setMenu('produce')
    const produce =  await getFarmerProduce()
    if(produce){
      setHHProduce(produce)
    }
  }
  const farmer = async() => {
    setLinkName('farmer')
    setMenu('farmer')
    const result = await getFarmer()
    if(result){
      setHHFarmer(result.AllFarmer)
    }
    console.log(result)
  }
  const consumer = async() => {
    setLinkName('consumer')
    setMenu('consumer')
    const result =  await getAllConsumer()
    if(result){
    setHHConsumer(result.AllConsumer)
    console.log(result)
  }
}
const getAdminProfile = async() => {
  setLinkName('profile')
  setMenu('profile')
  const url =  `http://localhost/admin/profile/${adminData.token}`
  const data = await admin.Axios.get(url,{
    headers: {
      Authorization: `Bearer ${adminData.id}`
    }
  })
  setAdminProfile(data.data)
  console.log(data)
}
const navbtn = () => {
  setCheck((prev) => !checked)
}
  return (
    <>
    <adminInfo.Provider value={adminData}>
    <Socket.Provider value={socket}>
      <input type="checkbox" id='navBtn' />
    <body className='dashboard'>
    <Router>
      <header className='admin_header'>
        <main>
         <article>
         <p><i class="fa-solid fa-house"></i> / {menu}</p>
          <h4 className='menu'>{menu}</h4>
         </article>
        <label htmlFor="navBtn" className='btnTrigger' onClick={navbtn}></label>
        </main>
        <aside>
          <ul>
            <li className='option'><i class="fa-solid fa-bell"></i></li>
            <li className='option'><i class="fa-solid fa-gear"></i></li>
          </ul>
        </aside>
      </header>
      <section className='admin-mainpage'>
      <nav className='side_panel'>
        <SidePanel dashboard={() => Dashboard()} produce={() => getProduce()} farmer={() => farmer()} consumer={consumer} profile={() => getAdminProfile()} linkName={linkName} navbtn={setCheck}/>
      </nav>
  <main className='main_body'>
  <Routes>
    <Route path='/dashboard' element={<Dashboard1 state={state}/>}/>
    <Route path='/product' element={<Product HHProduce={HHProduce} state={state}/>}/>
    <Route path='/profile' element={<Profile profile={adminProfile}/>}/>
    <Route path='/consumer' element={<Consumer HHConsumer={HHConsumer} state={state}/>}/>
    <Route path='/farmer' element={<Farmer HHFarmer={HHFarmer} state={state}/>}/>
  </Routes>
  </main>
      </section>
    </Router>
    </body>
    </Socket.Provider>
    </adminInfo.Provider>
    </>
  )
}

export default Dashboard