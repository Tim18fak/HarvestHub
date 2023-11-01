import { useState } from 'react'
import reactLogo from './assets/react.svg'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Header/Header'
import Signin from './components/Signin';
import Homepage from './components/Home/Homepage';
import About from './components/AboutUs/About';

const App = () =>  {
 

  return (
    <>
    <Router >
    <div><Header /></div>
    <Routes>
    <Route  path='/' element={<Homepage/>}/>
    <Route  path='/signin' element={<Signin/>}/>
    <Route  path='/about' element={<About/>}/>
    </Routes>
    </Router>
     
    </>
  )
}

export default App
