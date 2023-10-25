import React, {useState} from 'react'
import Cookies from 'universal-cookie'
import farmerDashboard from '../components/farmerComponent/farmerDashboard'
import UserDashboard from '../components/userComponent/UserDashboard'

const cookie = new Cookies

const Home = () => {

console.log(isFarmer)
    const Logout = () => {
        cookie.remove()
    }
  return (
    <div>
      <h2>Hello</h2>
      <button onClick={Logout}>logout</button>
    </div>
  )
}

export default Home
