import React from 'react'
import FarmerDashBoard from '../components/farmerComponent/farmerDashboard'
import UserDashboard from '../components/userComponent/UserDashboard'

const Home = ({farmer}) => {
    const isFarmer = farmer
    return isFarmer ? <FarmerDashBoard /> : <UserDashboard />;
}

export default Home
