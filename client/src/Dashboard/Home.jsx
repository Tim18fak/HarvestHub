import React from 'react'
import FarmerDashBoard from '../components/farmerComponent/FarmerDashboard'
import UserDashboard from '../components/userComponent/UserDashboard'

const Home = ({farmer, login}) => {
    const isFarmer = farmer
    return isFarmer ? <FarmerDashBoard login={login}/> : <UserDashboard />;
}

export default Home
