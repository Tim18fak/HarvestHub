import React,{ useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './global.css'



import Header from './components/Header/Header'
import Login from './pages/Login/Login';
import Homepage from './pages/Home/Homepage';
import About from './pages/AboutUs/About';
import Footer from './components/Footer/footer'
import cookie from '../config/cookie'
import Dashboard from './pages/Dashboard/Dashboard';



const App = () =>  {
  const [adminCookie,setAdminCookie] = useState(null)
  const id = cookie.get('id')
  if(id !== undefined) return <Dashboard/>
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
