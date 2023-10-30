import React, {useEffect} from 'react'
import io from 'socket.io-client'
const farmerDashboard = () => {
  useEffect(() => {
    // Replace 'https://your-socket-io-server-url' with the actual URL of your Socket.IO server
    setTimeout(() => {
      const socket = io('https://localhost:443/');
  
    socket.on('connect', () => {
      console.log('Connected to the Socket.IO server');
    });

    socket.on('chat message', (message) => {
      console.log('Received message: ' +  message);
      // Handle the incoming message here
    },2000)
    })
    },[]);
  return (
    <div>
      hh
    </div>
  )
}

export default farmerDashboard

