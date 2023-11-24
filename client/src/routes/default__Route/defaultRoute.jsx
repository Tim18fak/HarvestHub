import React from 'react';
import { cookie } from '../../../configs/default__configs/cookies';
import FarmerRoute from '../farmer__Route/FarmerRoute';
import ClientRoute from '../client__Route/ClientRoute';
const DefaultRoute = () => {
  /*  */
  const isFarmer =  cookie.get('isFarmer')
  if(isFarmer === true) return <FarmerRoute/>
return <ClientRoute/>
}

export default DefaultRoute;
