import { useState } from 'react'
import reactLogo from './assets/react.svg'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import viteLogo from '/vite.svg'
import './global.css'
import Header from './components/Header/Header'

import Login from './pages/Login/Login';
import Homepage from './pages/Home/Homepage';
import About from './pages/AboutUs/About';
import Footer from './components/Footer/footer'
const App = () =>  {
 

  return (
    <>
    <Router >
    <div><Header /></div>
    <Routes>
    <Route  path='/' element={<Homepage/>}/>
    <Route  path='/signin' element={<Login/>}/>
    <Route  path='/about' element={<About/>}/>
    </Routes>
    </Router>
     <Footer />
    </>
  )
}

export default App
