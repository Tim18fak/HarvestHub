import React, { useContext, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, UNSAFE_DataRouterStateContext, Link } from 'react-router-dom';
import ClientDashboard from '../../pages/consumer__Page/Dashboard/ClientDashboard';
import ConsumerSidePanel from '../../components/consumer__Components/Consumer_Header/ConsumerSidePanel';
import ConsumerProfile from '../../pages/consumer__Page/consumer__Profile/ConsumerProfile';
import ClientBookmarks from '../../pages/consumer__Page/Bookmarks/ClientBookmarks';
import {getBookmark, consumerNotification} from '../../../configs/consumer__configs/configs'
import { UserContext, Socket } from '../../../hooks/useContext/ConsumerInfo';
import Message from '../../pages/consumer__Page/Message/message';
import Notification from '../../pages/consumer__Page/Notification/Notification';
import './clientroute.css'
const ClientRoute = () => {
  const [bookMark,setBookMrk] = useState([])
  const [notificationResponse,setNotificationResponse] = useState('')
  const [hideNotification,setHideNotification] = useState(true)
  const [notification,setNotification] = useState(null)
  const userInfo  = useContext(UserContext)
  const socket = useContext(Socket)

  if(socket){
    socket.on('new_notification',(result) => {
      if(result){
        setHideNotification(false)
        setNotificationResponse(result)
      }
    })
  }

  const getConsumerBookmark = async() => {
    try {
      const bookmark = await getBookmark(userInfo);

      if (bookmark) {
          console.log(bookmark);
          setBookMrk(bookmark);
      }
  } catch (error) {
      console.error('Error:', error);
  }
  }

  const hideNotify = () => {
    setHideNotification(true)
  }
  const getNotification = async(userInfo) => {
    const result =  await consumerNotification(userInfo)
    if(result){
      setNotification(result)
    }
  }
  return (
    <Router>
      <header className='dashboard_header'>
        <h1>Harvest<span>Hub</span></h1>
        <aside>
        <Link to={'/cN/notification'}><i className={!hideNotification ? "fa-solid fa-bell fa-bounce" : "fa-solid fa-bell"} style={!hideNotification ? {
          color: 'red',
          fontSize: '30px'
        } : {
          color: 'red',
          fontSize: '20px'
        }} onClick={() => getNotification(userInfo)}></i></Link>
          {!hideNotification && (
            <>
            <h4 style={{
              color: 'white'
            }}>New Notification</h4>
            <p>{notificationResponse}</p>
            <button onClick={hideNotify}>Hide</button>
            </>
          )}
        </aside>
      </header>
    <section className='body' id='header_body'>
    <nav className='side_panel'>
    <ConsumerSidePanel bookMrk={() => getConsumerBookmark()}/>
    </nav>
    <main className='main_body'>
    <Routes>
      <Route path="/cN/dashboard" element={<ClientDashboard />} />
      <Route path="/cN/profile" element={<ConsumerProfile />} />
      <Route path='/cN/bokmarks' element={<ClientBookmarks bookmarks={bookMark}/>}/>
      <Route path='/cN/notification' element={<Notification notification={notification}/>}/>
      <Route path='/cN/message' element={<Message/>}/>
    </Routes>
    </main>
    </section>
  </Router>
  )
}

export default ClientRoute

