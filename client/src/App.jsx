import React, {useEffect} from 'react'
import SignIn from './Authentication/SignIn'
import ProduceUpload from './components/farmerComponent/ProduceUpload'
import FarmerProfile from './components/farmerComponent/FarmerProfile'
const App = () => {

  
  return (
    <div>
    {/* {<ProduceUpload/>} */}
      {<SignIn />}
      {/* < FarmerProfile /> */}
    </div>
  )
}

export default App


