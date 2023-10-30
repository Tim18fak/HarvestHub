import React from 'react'
import SignIn from './Authentication/SignIn'
import Chat from './Dashboard/Chat'
import './App.css'
import ProductUpload from './components/farmerComponent/ProduceUpload'

const App = () => {
  return (
    <div>
     {/*  <Chat /> */}
     {/*  {<SignIn />} */}
      <ProductUpload />
    </div>
  )
}

export default App

