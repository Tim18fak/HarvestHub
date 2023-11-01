import React, {useEffect, useState} from 'react'
import FarmerInfo from './constants/FarmerContextProvider';
import io from 'socket.io-client'
import Cookies from 'universal-cookie';
import Test from './Test';
import ProduceUpload from './ProduceUpload';
import FarmerProfile from './FarmerProfile'
const cookie = new Cookies


const FarmerDashboard = () => {
  const [userid, SetUserid] = useState('')
  const [fullname, SetFullname] = useState('')
  useEffect(() => {
    /* // Replace 'https://your-socket-io-server-url' with the actual URL of your Socket.IO server
    setTimeout(() => {
      const socket = io('https://localhost:443/');
  
    socket.on('connect', () => {
      console.log('Connected to the Socket.IO server');
    });

    socket.on('chat message', (message) => {
      console.log('Received message: ' +  message);
      
   */
  const id  = cookie.get('userId')
  SetUserid(id)
  const fullname = cookie.get('fullName')
  SetFullname(fullname)
    },[]);
  return (
    <FarmerInfo.Provider value={{userid,fullname}}>
      <ProduceUpload />
      <FarmerProfile />
    </FarmerInfo.Provider>
  )
}

export default FarmerDashboard

