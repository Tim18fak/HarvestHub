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
    <section className='active_user-info'>
      {/* farmer information */}
      <div>
       {!leftDetail && (
         <main>
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
          <tr key={index} index={index} >
            <td>{index}</td>
            <td><img src={value.profileImage} alt="" width={50} height={50} /></td>
            <td>{value.username}</td>
            <td>{value.verificationStatus}</td>
            <td>{value.NIN}</td>
            <td><a href="#"  onClick={() => showFarmerFullDetails(value)}>Details</a></td>
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
       )}
        {leftDetail && (
          <aside>
            <a href="#"  onClick={backLeft}>Back</a>
              <h3>Farmer Full Details</h3>
              <figure>
              <img src={maxDetailLeft.profileImage} alt="" />
              <h2>{maxDetailLeft.fullname}</h2>
            </figure>
            <h4>Personal Information</h4>
            <ul>
              <li>ID {maxDetailLeft.Id}</li>
              <li><span>NIN</span>{maxDetailLeft.NIN}</li>
<li><span>Activation Code Status: </span>{maxDetailLeft.activationCodeStatus}</li>
              <li><span>Email: </span>{maxDetailLeft.email}</li>
              <li>{maxDetailLeft.address}</li>
              <li><span>Cell: </span>{maxDetailLeft.phoneNumber}</li>
              <li><span>Verification Status: </span>{maxDetailLeft.verificationStatus}</li>
              <h4>Farmer's Farm Information</h4>
              <ul>
            <li><span>Farm Type: </span>{maxDetailLeft.farmType}</li>
            <li><span>Farm Address: </span>{maxDetailLeft.farm_Address}</li>
            <li><span>Farmer's Experience: </span>{maxDetailLeft.farmingExperience}</li>
          </ul>
              <footer><span>Hear about:</span> {maxDetailLeft.comeAbout}</footer>
            </ul>
          </aside>
        )}
      </div>

      {/* consumer Information */}
      <div>
       {!rightDetail && (
         <main>
            <h3>Active Consumers</h3>
      <table className='active-user_table'>
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
            <td><a href="#"  onClick={() => showConsumerFullDetails(value)} >Details</a></td>
          </tr>
        ))}
      </tbody>
    </table>
         </main>
       )}
        {rightDetail && (
          <aside>
            <a href="#" onClick={backRight}>Back</a>
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