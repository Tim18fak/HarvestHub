import React, { useContext, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FarmerSidePanel from '../../components/farmer__Component/farmerSidePanel';
import FarmerDashboard from '../../pages/farmer__Page/farmer__Dashboard/FarmerDashboard';
import FarmerProfile from '../../pages/farmer__Page/farmer__Profile/FarmerProfile';
import FarmerProduce from '../../pages/farmer__Page/farmer__Produce/farmerProduce';
import FarmerAddProduce from '../../pages/farmer__Page/Add__Produce/FarmerAddProduce';
import { GetProfile,GetProduce } from '../../../configs/farmer_configs/fetch';
import { UserContext } from '../../../hooks/useContext/ConsumerInfo';



const FarmerRoute = () => {
  const [resState,setResState] =  useState(false)
  const [] = 
  const userInfo =  useContext(UserContext)
  const getprofile= async(userInfo) => {
    const results = await GetProfile(userInfo)
  }
  const getproduce = async(userInfo) =>{
    const results =  await GetProduce(userInfo)
    if(results){
      setResState(true)
    }
  }
  return (
    <Router>
      <FarmerSidePanel  getProfile={() => getprofile(userInfo)} getProduce={() => getproduce(userInfo)}/>
      <Routes>
        <Route path="/fM/dashboard" element={<FarmerDashboard />} />
        <Route path='/fM/profile' element={<FarmerProfile state={resState}/>}/>
        <Route path='/fM/produce' element={<FarmerProduce state={resState}/>}/>
        <Route path='/fM/upload_produce' element={<FarmerAddProduce/>}/>
        <Route path=''/>
      </Routes>
    </Router>
  )
}

export default FarmerRoute
