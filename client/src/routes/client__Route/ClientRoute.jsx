import React, { useContext, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, UNSAFE_DataRouterStateContext } from 'react-router-dom';
import ClientDashboard from '../../pages/consumer__Page/Dashboard/ClientDashboard';
import ConsumerSidePanel from '../../components/consumer__Components/Consumer_Header/ConsumerSidePanel';
import ConsumerProfile from '../../pages/consumer__Page/consumer__Profile/ConsumerProfile';
import ClientBookmarks from '../../pages/consumer__Page/Bookmarks/ClientBookmarks';
import {getBookmark} from '../../../configs/consumer__configs/configs'
import { UserContext, Socket } from '../../../hooks/useContext/ConsumerInfo';
import Message from '../../pages/consumer__Page/Message/message';
import Notification from '../../pages/consumer__Page/Notification/Notification';

const ClientRoute = () => {
  const [bookMark,setBookMrk] = useState([])
  const [notificationResponse,setNotificationResponse] = useState('')
  const [hideNotification,setHideNotification] = useState(true)
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
  return (
    <Router>
      <header>
        <h1>HarvestHub</h1>
        <aside>
          {!hideNotification && (
            <>
            <h4>New Notification</h4>
            <p>{notificationResponse}</p>
            <button onClick={hideNotify}>Hide</button>
            </>
          )}
        </aside>
      </header>
    <ConsumerSidePanel bookMrk={() => getConsumerBookmark()}/>
    <Routes>
      <Route path="/cN/dashboard" element={<ClientDashboard />} />
      <Route path="/cN/profile" element={<ConsumerProfile />} />
      <Route path='/cN/bokmarks' element={<ClientBookmarks bookmarks={bookMark}/>}/>
      <Route path='/cN/notification' element={<Notification/>}/>
      <Route path='/cN/message' element={<Message/>}/>
    </Routes>
  </Router>
  )
}

export default ClientRoute

