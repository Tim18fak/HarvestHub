import React, { useContext, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ClientDashboard from '../../pages/consumer__Page/Dashboard/ClientDashboard';
import ConsumerSidePanel from '../../components/consumer__Components/Consumer_Header/ConsumerSidePanel';
import ConsumerProfile from '../../pages/consumer__Page/consumer__Profile/ConsumerProfile';
import ClientBookmarks from '../../pages/consumer__Page/Bookmarks/ClientBookmarks';
import {getBookmark} from '../../../configs/consumer__configs/configs'
import { UserContext } from '../../../hooks/useContext/ConsumerInfo';
import Message from '../../pages/consumer__Page/Message/message';
import Notification from '../../pages/consumer__Page/Notification/Notification';

const ClientRoute = () => {
  const [bookMark,setBookMrk] = useState([])
  const userInfo  = useContext(UserContext)

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
  return (
    <Router>
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
/* g */
export default ClientRoute

