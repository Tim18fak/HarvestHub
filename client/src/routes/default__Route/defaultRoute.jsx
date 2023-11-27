import React, { useEffect, useState } from 'react';
import { cookie } from '../../../configs/default__configs/cookies';
import FarmerRoute from '../farmer__Route/FarmerRoute';
import ClientRoute from '../client__Route/ClientRoute';
import { UserContext } from '../../../hooks/useContext/ConsumerInfo';

const DefaultRoute = () => {
  const [userInfo,setUserInfo] =   useState()
  /*  */
  useEffect(() => {
    const clientInfo =  cookie.getAll()
    setUserInfo(clientInfo)
  },[])
  const isFarmer =  cookie.get('isFarmer')
  if(isFarmer === true) return (
  <UserContext.Provider value={userInfo}>
  <FarmerRoute/>
  </UserContext.Provider>
  )
return (
<UserContext.Provider value={userInfo}>
<ClientRoute/>
</UserContext.Provider>
)
}

export default DefaultRoute;
