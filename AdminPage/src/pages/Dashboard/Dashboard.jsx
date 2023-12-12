import React, { useEffect, useState } from 'react'
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
import { Socket, adminInfo } from '../../../hooks/usecontext/useContext';

const cookie  = new Cookies()

const Dashboard = () => {
  const [adminData,setAdminData] = useState('')
  const [socket,setSocket] = useState(null)
  const [state,setState] = useState(true)
  useEffect(() => {
    const admin =  cookie.getAll()
    if(admin){
      setAdminData(admin)
      const socket =  io('http://localhost')
      socket.on('connect', () => {
        console.log('Connected to the server');
      });
      socket.emit('activeAdmin',{admin})
      socket.emit('adminLogin')
      setSocket(socket)
    }
  },[])
  const Dashboard = () => {
    if(socket){
      socket.emit('adminLogin')
    }
  }
  const getProduce = () => {

  }
  return (
    <>
    <adminInfo.Provider value={adminData}>
    <Socket.Provider value={socket}>
    <Router>
      <header className='admin_header'>
        <h3>HarvestHub</h3>
        <input type="checkbox"  id="btn" />
        <label htmlFor="btn">hh</label>
      </header>
      <section className='admin-mainpage'>
      <nav><SidePanel dashboard={() => Dashboard()} produce={() => getProduce()}/></nav>
  <main>
  <Routes>
    <Route path='/dashboard' element={<Dashboard1 state={state}/>}/>
    <Route path='/product' element={<Product/>}/>
    <Route path='/profile' element={<Profile/>}/>
    <Route path='/consumer' element={<Consumer/>}/>
    <Route path='/farmer' element={<Farmer/>}/>
  </Routes>
  </main>
      </section>
    </Router>
    </Socket.Provider>
    </adminInfo.Provider>
    </>
  )
}

export default Dashboard