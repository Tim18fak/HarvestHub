import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ClientDashboard from '../../pages/consumer__Page/Dashboard/client__Dashboard';
import ConsumerSidePanel from '../../components/consumer__Components/Consumer_Header/ConsumerSidePanel';
import ConsumerProfile from '../../pages/consumer__Page/consumer__Profile/ConsumerProfile';

const ClientRoute = () => {
  return (
    <Router>
      <ConsumerSidePanel />
      <Routes>
        <Route path="/cN/dashboard" element={<ClientDashboard />} />
        <Route path="/cN/profile" element={<ConsumerProfile />} />
      </Routes>
    </Router>
  )
}

export default ClientRoute
