import React, { useEffect, useState } from 'react';
import { cookie } from '../../../configs/default__configs/cookies';
import FarmerRoute from '../farmer__Route/FarmerRoute';
import ClientRoute from '../client__Route/ClientRoute';
import { UserContext,Socket,UserData} from '../../../hooks/useContext/ConsumerInfo';
import io from 'socket.io-client'
import Preloader from '../../components/default__Component/preloader/Preloader';
import { Axios } from '../../../configs/default__configs/axios.config';

const DefaultRoute = () => {
  const [userInfo,setUserInfo] =   useState()
  const [socket,setSocket] = useState()
  const [connectionId,setConnectionId] = useState()
  const [fetchData,setFetchData] = useState({})
  const [gotUserData,setGotUserData] = useState(false)

  /*  */
  useEffect(() => {
    const clientInfo =  cookie.getAll()
    const {_id,isFarmer} = clientInfo;
    setUserInfo(clientInfo)
    
    const UserData = async(id,isFarmer,clientInfo) => {
      const url = `http://localhost/auth/uD/${id}/${isFarmer}`
      const userdata = await Axios.get(url,{
        headers: {
          Authorization: `Bearer ${clientInfo.accessToken}`
        }
      })
      if(userdata){
        console.log(userdata)
        setFetchData(userdata.data)
        setTimeout(() => {
          setGotUserData(true)
        },5000)
      }
    }


    UserData(_id,isFarmer,clientInfo)

    console.log(clientInfo)
    const socket = io('http://localhost', {
        query: {
          authorization: `${'hh'}`,
      },
    });
    setSocket(socket)
    socket.emit('active',clientInfo)
    setConnectionId(socket.id)
    console.log(socket)    
  },[])

  const isFarmer =  cookie.get('isFarmer')
  if(!gotUserData) return <Preloader/>

  return(
    <UserContext.Provider value={userInfo}>
      <Socket.Provider value={socket}>
      <UserData.Provider value={fetchData}>
      {isFarmer ? <FarmerRoute/> : <ClientRoute/>}
      </UserData.Provider>
      </Socket.Provider>
    </UserContext.Provider>
  )
}

export default DefaultRoute;