import React, { useEffect } from 'react'
import { cookie } from '../../../../configs/default__configs/cookies'
import { Login } from '../../../../configs/default__configs/connect'


const FarmerDashboard = () => {
  useEffect(() => {
    const username =  cookie.get('username')
    if(username){
      Login()
    }
  },[])
  return (
    <div>
      FarmerDashboard
    </div>
  )
}

export default FarmerDashboard
