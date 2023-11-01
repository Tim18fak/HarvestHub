import React, {useContext} from 'react'
import FarmerInfo from './constants/FarmerContextProvider'
const Test = () => {
const {userid} = useContext(FarmerInfo)
  return (
    <div>
      {userid}
    </div>
  )
}

export default Test