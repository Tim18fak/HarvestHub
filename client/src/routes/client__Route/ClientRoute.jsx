import React, { useContext, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, UNSAFE_DataRouterStateContext, Link } from 'react-router-dom';
import ClientDashboard from '../../pages/consumer__Page/Dashboard/ClientDashboard';
import ConsumerSidePanel from '../../components/consumer__Components/Consumer_Header/ConsumerSidePanel';
import ConsumerProfile from '../../pages/consumer__Page/consumer__Profile/ConsumerProfile';
import ClientBookmarks from '../../pages/consumer__Page/Bookmarks/ClientBookmarks';
import {getBookmark, consumerNotification} from '../../../configs/consumer__configs/configs'
import { UserContext, Socket } from '../../../hooks/useContext/ConsumerInfo';
import Review from '../../pages/consumer__Page/ReviewProduce/Review';
import Notification from '../../pages/consumer__Page/Notification/Notification';
import './clientroute.css'
import { Axios } from '../../../configs/default__configs/axios.config';

const ClientRoute = () => {
  const [bookMark,setBookMrk] = useState([])
  const [notificationResponse,setNotificationResponse] = useState('')
  const [hideNotification,setHideNotification] = useState(true)
  const [notification,setNotification] = useState(null)
  const [getReview,setGetReview] = useState([])
  const [navBtn,setNavBtn] = useState(false)
  const [menu,setMenu] =  useState('')
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
      setMenu('home / bookmark')
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
    setMenu('home / Notification')
    const result =  await consumerNotification(userInfo)
    if(result){
      setNotification(result)
    }
  }
  const getReviewedProduce = async() => {
    setMenu('home / Review')
    const url = `http://localhost/client/review/getreview/${userInfo._id}`
    const review = await Axios.get(url,{
      headers: {
        Authorization: `Bearer ${userInfo.accessToken}`
      }
    })
    setGetReview(review.data)
    console.log(review)
  }

  const navbtn = () => {
    setNavBtn(!navBtn)
  }

  return (
    <Router>
      <input type="checkbox"  id='navBtn' onChange={navbtn} />
      <body className='dashboard'>
      <header className='dashboard_header'>
        <main>
          <span>{menu}</span>
          <label htmlFor="navBtn" id='btn'></label>
        </main>
        <aside>
        <ul>
          <li><Link to={'/cN/notification'}><i className={!hideNotification ? "fa-solid fa-bell fa-bounce" : "fa-solid fa-bell"} style={!hideNotification ? {
          color: 'red',
          fontSize: '30px'
        } : {
          color: 'red',
          fontSize: '20px'
        }} onClick={() => getNotification(userInfo)}></i></Link>
        </li>
        <li>Set</li>
        </ul>

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
    <ConsumerSidePanel bookMrk={() => getConsumerBookmark()} review={() => getReviewedProduce()} menu={setMenu}  navBtn={navBtn}/>
    </nav>
    <main className='main_body'>
    <Routes>
      <Route path="/cN/dashboard" element={<ClientDashboard menu={navBtn} />} />
      <Route path="/cN/profile" element={<ConsumerProfile menu={navBtn}/>} />
      <Route path='/cN/bokmarks' element={<ClientBookmarks bookmarks={bookMark} menu={navBtn}/>}/>
      <Route path='/cN/notification' element={<Notification notification={notification} menu={navBtn}/>}/>
      <Route path='/cN/message' element={<Review review={getReview} menu={navBtn}/>}/>
    </Routes>
    </main>
    </section>
      </body>
  </Router>
  )
}

export default ClientRoute

