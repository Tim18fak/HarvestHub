import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SidePanel from '../../components/SidePanel/sidePanel'
import Profile from '../Profile/Profile'
import Dashboard1 from '../MainPanel/Dashboard';
import Product from '../DatabaseProduct/Product';
import {io} from 'socket.io-client';
import Cookies from 'universal-cookie';

const cookie  = new Cookies()

const Dashboard = () => {
  useEffect(() => {
    const username =  cookie.get()
    if(username){
      const socket =  io('http://localhost')
      socket.on('connect', () => {
        console.log('Connected to the server');
      });
      socket.emit('chat', 'hello')
    }
  },[])
  return (
    <>
    <Router>
  <div><SidePanel/></div>
  <div>
  <Routes>
    <Route path='/dashboard' element={<Dashboard1/>}/>
    <Route path='/product' element={<Product/>}/>
    <Route path='/profile' element={<Profile/>}/>
  </Routes>
  </div>
    </Router>
    </>
  )
}

export default Dashboard