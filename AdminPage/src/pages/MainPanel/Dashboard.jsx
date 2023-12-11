import React, { useContext } from 'react'
import './dashboard1.css'
import { Socket } from '../../../hooks/usecontext/useContext'

const Dashboard1 = () => {
  const socket = useContext(Socket)
  console.log(socket)
  return (
    <>
    <section className='dashboard_welcome-page'>

    </section>
    <section className='dashboard_active-userinfo'>
      <div>
        <h1></h1>
        <h3>Total Active User</h3>
      </div>
      <div>
        <h1></h1>
        <h3>Total Active Consumer</h3>
      </div>
      <div>
        <h3>Total Active Farmer</h3>
      </div>
    </section>
    <section className='active-user-inforamtion'>
      <h3>Active User Information</h3>
      <main>
      <div>
        <h3>Active Farmer Details</h3>
      </div>
      <div>
        <h3>Active Consumer Details</h3>
      </div>
      </main>
    </section>
    </>
  )
}

export default Dashboard1