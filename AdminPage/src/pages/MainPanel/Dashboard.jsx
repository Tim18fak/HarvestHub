import React, { useContext, useEffect, useState } from 'react'
import './dashboard1.css'
import { Socket } from '../../../hooks/usecontext/useContext'
import Cookies from 'universal-cookie'
import Loader from '../../components/anims/loader/Loader'
import TwoLineGraph from '../../components/LineGraph/TwoLIneGraph'
const cookie =  new Cookies()


const Dashboard1 = ({state}) => {
  const [activeFarmerInfo,setFarmerInfo] = useState([])
  const [triggerAnimation,setTriggerAnimation] = useState(state)
  const [activeConsumerInfo,setConsumerInfo] = useState([])
  const [totalU,setTotalU] = useState(0)
  const [totalF,setTotalF] = useState(0)
  const [leftDetail,setLeftDetail] = useState(false)
  const [rightDetail,setRightDetail] = useState(false)
  const [maxDetailLeft,setMaxDetailLeft] = useState([])
  const [maxDetailRight,setMaxDetailRigtht] = useState([])
  const socket = useContext(Socket)
  console.log(socket)

  useEffect(() => {
    setTimeout(() => {
      setTriggerAnimation(false)
    },4500)
  },[state])

useEffect(() => {
   console.log('hell')
},[totalF,totalU])


 if(socket){
 /* get the active user number */
  socket.on('activeUser',(data) => {
   if(!data){
    window.location.reload()
   }
   const {totalConsumer,totalFarmer} =  data
   console.log('seen')
   cookie.set('activeConsumer',totalConsumer)
   cookie.set('activeFarmer', totalFarmer)
   setTotalF(totalFarmer)
   setTotalU(totalConsumer)
  })
  /* get the active user data */
  socket.on('activeUserInfo',(data) => {
    if(!data){return
    }
    const {activeConsumerInfo,activeFarmerInfo} = data
    console.log('user Data')
    setConsumerInfo(activeConsumerInfo)
    setFarmerInfo(activeFarmerInfo)
  })
 }
 /*  */
 const showUserData = () => {

 }
 const showFarmerFullDetails = (value) => {
   setMaxDetailLeft(value)
   setLeftDetail(true)
   console.log(maxDetailLeft)
 }
 const showConsumerFullDetails = (value) => {
   setMaxDetailRigtht(value)
   setRightDetail(true)
   console.log(maxDetailRight)
 }
 const backRight = () => {
  setRightDetail(false)
 }
 const backLeft = () => {
  setLeftDetail(false)
 }
 /*  */
 if(triggerAnimation) return <Loader/>
  return (
    <>
    <section className='dashboard_active-userinfo'>
      <div>
      <p progress='bar'><span></span></p>
        <h1>{cookie.get('activeConsumer') + cookie.get('activeFarmer')}</h1>
        <h3>Total Active User</h3>
      </div>
      <div>
      <p progress='bar'><span style={{
        width: `cal(${cookie.get('activeConsuemr')} *  * 20px)`
      }}></span></p>
        <h1>{cookie.get('activeConsumer')}</h1>
        <h3>Active Consumer</h3>
      </div>
      <div>
      <p progress='bar'><span></span></p>
        <h1>{cookie.get('activeFarmer')}</h1>
        <h3>Active Farmer</h3>
      </div>
    </section>
    <section className='line-graph'></section>
    {/* active user graph plot */}
    {/* <TwoLineGraph/> */}
    {/*  */}
    <section className='active_user-info'>
      {/* farmer information */}
      <div className='active-user-data'>
         <main >
             <h3>Active Farmers</h3>
      <table className='active-user_table'>
      <thead>
        <tr  className='active-user_table-heads'>
          <th>#</th>
          <th>Image</th>
          <th>Username</th>
          <th>VerificationStatus</th>
          <th>NIN</th>
          <th>View</th>
        </tr>
      </thead>
      <tbody>
        {activeFarmerInfo && activeFarmerInfo.map((value,index) => (
          <tr key={index} index={index} className='.active-user_table'>
            <td>{index}</td>
            <td><img src={value.profileImage} alt="" width={50} height={50} /></td>
            <td>{value.username}</td>
            <td>{value.verificationStatus}</td>
            <td>{value.NIN}</td>
            <td><a onClick={() => showFarmerFullDetails(value)}>Details</a></td>
          </tr>
        ))}
      </tbody>
      {!activeFarmerInfo && (
          <div>
            <p>No Active Farmer</p>
          </div>
        )}
    </table>
         </main>
        {leftDetail && (
          <aside className='user-full-data'>
            <a onClick={backLeft}>
            <i class="fa-solid fa-x fa-beat" style={{
      color: '#0a790b'
     }}></i> 
            </a>
            <article>
            <figure>
              <img src={maxDetailLeft.profileImage} alt="" />
            </figure>
            <main>
              <h2>{maxDetailLeft.fullname}</h2>
              <p>NIN: {maxDetailLeft.NIN}</p>
              <p>Email: {maxDetailLeft.email}</p>
              <p>Status: {maxDetailLeft.verificationStatus}</p>
            </main>
            </article>
          </aside>
        )}
      </div>

      {/* consumer Information */}
      <div className='active-user-data consumer'>
         <main>
            <h3 table='header'>Active Consumers</h3>
      <table className='active-user_table'>
      <thead>
        <tr>
          <th table='header'>#</th>
          <th table='header'>Image</th>
          <th table='header'>Username</th>
          <th table='header'>VerificationStatus</th>
          <th table='header'>NIN</th>
          <th table='header'>View</th>
        </tr>
      </thead>
      <tbody>
        {activeConsumerInfo && activeConsumerInfo.map((value,index) => (
          <tr key={index}>
            <td>{index}</td>
            <td><img src={value.profileImage} alt="" width={50} height={50} /></td>
            <td>{value.username}</td>
            <td>{value.verificationStatus}</td>
            <td>{value.NIN}</td>
            <td><a href="#"  onClick={() => showConsumerFullDetails(value)} >Details</a></td>
          </tr>
        ))}
      </tbody>
    </table>
         </main>
        {rightDetail && (
          <aside className='user-full-data'>
            <a onClick={backRight}>
            <i class="fa-solid fa-x fa-beat" style={{
      color: '#0a790b'
     }}></i> </a>

            <article>
            <figure>
              <img src={maxDetailRight.profileImage} alt="" />
            </figure>
            <main>
              <h2>{maxDetailRight.fullname}</h2>
              <p>NIN: {maxDetailRight.NIN}</p>
              <p>Email: {maxDetailRight.email}</p>
            </main>
            </article>
          </aside>
        )}
      </div>
    </section>
    </>
  )
}

export default Dashboard1