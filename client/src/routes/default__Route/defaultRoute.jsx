import React, { useEffect, useState } from 'react';
import { cookie } from '../../../configs/default__configs/cookies';
import FarmerRoute from '../farmer__Route/FarmerRoute';
import ClientRoute from '../client__Route/ClientRoute';
import { UserContext,useSocket} from '../../../hooks/useContext/ConsumerInfo';
import io from 'socket.io-client'

const DefaultRoute = () => {
  const [userInfo,setUserInfo] =   useState()
  const [socket,setSocket] = useState()
  const [connectionId,setConnectionId] = useState()

  /*  */
  useEffect(() => {
    const clientInfo =  cookie.getAll()
    setUserInfo(clientInfo)
    const socket = io('http://localhost', {
        query: {
          authorization: `${'hh'}`,
      },
    });
    setSocket(socket)
    setConnectionId(socket.id)
    console.log(socket)
    
  },[])

  const isFarmer =  cookie.get('isFarmer')
  return(
    <UserContext.Provider value={userInfo}>
      <useSocket.Provider value={socket}>
      {isFarmer ? <FarmerRoute/> : <ClientRoute/>}
      </useSocket.Provider>
    </UserContext.Provider>
  )
}

export default DefaultRoute;