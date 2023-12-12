import React, { useContext, useEffect, useState } from 'react'
import './dashboard1.css'
import { Socket } from '../../../hooks/usecontext/useContext'
import Cookies from 'universal-cookie'
import Loader from '../../components/anims/loader/Loader'
const cookie =  new Cookies()


const Dashboard1 = () => {
  const [activeFarmerInfo,setFarmerInfo] = useState([])
  const [triggerAnimation,setTriggerAnimation] = useState(true)
  const [activeConsumerInfo,setConsumerInfo] = useState([])
  const socket = useContext(Socket)
  console.log(socket)
  useEffect(() => {
    if(socket){
      
    }
  },[]) 
 if(socket){
 
  socket.on('activeUser',(data) => {
    const {totalConsumer,totalFarmer} =  data
    cookie.set('activeFarmer',totalFarmer)
    cookie.set('activeConsumer',totalConsumer)
    console.log(data)
  })
  socket.on('activeUserInfo',(data) => {
    const {activeConsumerInfo,activeFarmerInfo} = data
    setConsumerInfo(activeConsumerInfo)
    setFarmerInfo(activeFarmerInfo)
  })
  console.log(activeConsumerInfo)
 }
 if(!triggerAnimation) return <Loader/>
  return (
    <>
    <section className='dashboard_active-userinfo'>
      <div>
        <h1>{cookie.get('activeConsumer') + cookie.get('activeFarmer')}</h1>
        <h3>Total Active User</h3>
      </div>
      <div>
        <h1>{cookie.get('activeConsumer')}</h1>
        <h3>Total Active Consumer</h3>
      </div>
      <div>
        <h1>{cookie.get('activeFarmer')}</h1>
        <h3>Total Active Farmer</h3>
      </div>
    </section>
    <h3>{activeConsumerInfo.length > 0 &&  activeConsumerInfo[2].username}</h3>
    <section className='active-user-inforamtion'>
      <h3>Active User Information</h3>
      <main>
      <div>
        <h3>Active Farmer Details</h3>
        <main>
          {activeConsumerInfo && activeConsumerInfo.map((value,index) => {
            <h1 key={index}>{value.fullname}</h1>
          })}
        </main>
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