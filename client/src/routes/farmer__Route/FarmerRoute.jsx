import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FarmerSidePanel from '../../components/farmer__Component/farmerSidePanel';
import FarmerDashboard from '../../pages/farmer__Page/farmer__Dashboard/FarmerDashboard';
import FarmerProfile from '../../pages/farmer__Page/farmer__Profile/FarmerProfile';
import FarmerProduce from '../../pages/farmer__Page/farmer__Produce/farmerProduce';
import FarmerAddProduce from '../../pages/farmer__Page/Add__Produce/FarmerAddProduce';

const FarmerRoute = () => {
  return (
    <Router>
      <FarmerSidePanel/>
      <Routes>
        <Route path="/fM/dashboard" element={<FarmerDashboard />} />
        <Route path='/fM/product'/>
        <Route path='/fM/profile' element={<FarmerProfile/>}/>
        <Route path='/fM/produce' element={<FarmerProduce/>}/>
        <Route path='/fM/upload_produce' element={<FarmerAddProduce/>}/>
        <Route path=''/>
      </Routes>
    </Router>
  )
}

export default FarmerRoute
