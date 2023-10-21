import React from 'react'
import Cookies from 'universal-cookie'

const cookie = new Cookies

const Home = () => {
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
