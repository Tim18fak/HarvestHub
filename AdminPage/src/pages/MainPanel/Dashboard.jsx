import React, { useContext, useEffect, useState } from 'react'
import './dashboard1.css'
import { Socket } from '../../../hooks/usecontext/useContext'
import Cookies from 'universal-cookie'
import Loader from '../../components/anims/loader/Loader'
const cookie =  new Cookies()


const Dashboard1 = ({state}) => {
  const [activeFarmerInfo,setFarmerInfo] = useState([])
  const [triggerAnimation,setTriggerAnimation] = useState(state)
  const [activeConsumerInfo,setConsumerInfo] = useState([])
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

 if(socket){
 /* get the active user number */
  socket.on('activeUser',(data) => {
    const {totalConsumer,totalFarmer} =  data
    cookie.set('activeFarmer',totalFarmer)
    cookie.set('activeConsumer',totalConsumer)
    console.log(data)
  })
  /* get the active user data */
  socket.on('activeUserInfo',(data) => {
    const {activeConsumerInfo,activeFarmerInfo} = data
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

    {/*  */}
    <section>
      {/* farmer information */}
      <div>
       {!leftDetail && (
         <main>
             <h3>Active Farmer Details</h3>
             <table>
      <thead>
        <tr>
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
          <tr key={index}>
            <td>{index}</td>
            <td><img src={value.profileImage} alt="" width={50} height={50} /></td>
            <td>{value.username}</td>
            <td>{value.verificationStatus}</td>
            <td>{value.NIN}</td>
            <td><a href="http://" target="_blank" rel="noopener noreferrer" onClick={() => showFarmerFullDetails(value)}>Details</a></td>
          </tr>
        ))}
      </tbody>
    </table>
         </main>
       )}
        {leftDetail && (
          <aside>
            <a href="http://" target="_blank" rel="noopener noreferrer" onClick={backLeft}>Back</a>
              <h3>Farmer Full Details</h3>
              <figure>
              <img src={maxDetailLeft.profileImage} alt="" />
              <h2>{maxDetailLeft.fullname}</h2>
            </figure>
            <ul>
              <li>{maxDetailLeft.email}</li><br />
              <li>{maxDetailLeft.address}</li>
              <li>{maxDetailLeft.phoneNumber}</li>
              <li>{maxDetailLeft.NIN}</li>
              <footer><span>Hear about:</span> {maxDetailLeft.comeAbout}</footer>
            </ul>
          </aside>
        )}
      </div>

      {/* consumer Information */}
      <div>
       {!rightDetail && (
         <main>
            <h3>Active Consumer Details</h3>
            <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Image</th>
          <th>Username</th>
          <th>VerificationStatus</th>
          <th>NIN</th>
          <th>View</th>
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
            <td><a href="http://" target="_blank" rel="noopener noreferrer" onClick={() => showConsumerFullDetails(value)} >Details</a></td>
          </tr>
        ))}
      </tbody>
    </table>
         </main>
       )}
        {rightDetail && (
          <aside>
            <a href="http://" target="_blank" rel="noopener noreferrer" onClick={backRight}>Back</a>
            <h3>Consumer Full Details</h3>
            <figure>
              <img src={maxDetailRight.profileImage} alt="" />
              <h2>{maxDetailRight.fullname}</h2>
            </figure>
            <ul>
              <li>{maxDetailRight.email}</li><br />
              <li>{maxDetailRight.address}</li>
              <li>{maxDetailRight.phoneNumber}</li>
              <li>{maxDetailRight.NIN}</li>
              <footer><span>Hear about</span> {maxDetailRight.comeAbout}</footer>
            </ul>
          </aside>
        )}
      </div>
    </section>
    </>
  )
}

export default Dashboard1