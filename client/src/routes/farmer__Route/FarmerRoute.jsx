import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


const FarmerRoute = () => {
  return (
    <Router>
      
      <Routes>
        <Route path="/fM/dashboard" element={<ClientDashboard />} />
      </Routes>
      hh
    </Router>
  )
}

export default FarmerRoute
