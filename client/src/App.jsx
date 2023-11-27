import Header from "./components/default__Component/Header"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from "./pages/default__Pages/Main";
import Contact from "./pages/default__Pages/Contact";
import About from './pages/default__Pages/About'
import Auth from './pages/default__Pages/Auth'
import Footer from "./components/default__Component/Footer";
import Reset from "./pages/default__Pages/Reset";
import { cookie } from "../configs/default__configs/cookies";
import DefaultRoute from "./routes/default__Route/defaultRoute";
import './global.css'
const  App = () =>  {
  const id =  cookie.get('_id')
  if(id !== undefined) return <DefaultRoute/>
  return (
    <>
      <Router >
    <div><Header /></div>
    <Routes>
    <Route  path='/' element={<Main/>}/>
    <Route  path='/contact' element={<Contact/>}/>
    <Route  path='/about' element={<About/>}/>
    <Route  path='/auth' element={<Auth/>}/>
    <Route path="/reset" element={<Reset/>}/>
    </Routes>
    <Footer/>
    </Router>
    </>
  )
}

export default App
