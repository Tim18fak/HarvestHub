import React from 'react'
import Cookies from 'universal-cookie'
import Dashboard from '../components/farmerComponent/Dashboard'


const cookie = new Cookies

const Home = (props) => {

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
