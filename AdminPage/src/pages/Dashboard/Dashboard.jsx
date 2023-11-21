import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SidePanel from '../../components/SidePanel/sidePanel'
import Profile from '../Profile/Profile'
import Dashboard1 from '../MainPanel/Dashboard';
import Product from '../DatabaseProduct/Product';
const Dashboard = () => {
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