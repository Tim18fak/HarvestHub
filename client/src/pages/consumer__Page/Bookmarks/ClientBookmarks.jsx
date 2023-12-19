import React, { useEffect, useState,useContext } from 'react'
import { GetFarmerInfo, deleteBookMrk } from '../../../../configs/consumer__configs/configs'
import ShowProduceInfo from '../ShowProduceAndFarmerInfo/ShowProduceInfo'
import SpinnerLoader from '../../../anim/Loaders/SpinnerLoader'
import { Socket, UserContext } from '../../../../hooks/useContext/ConsumerInfo'
import ImageSlider from '../../../components/default__Component/ImageSlider/ImageSlider'
import Rotate from '../../../anim/Loaders/Rotate'
import './bookmark.css'

const ClientBookmarks = ({bookmarks}) => {
    const [clientBookmarks,setClientBookmarks] = useState([])
    const [farmerInformation,setFarmerInformation] = useState(null)
    const [triggerAnimation,setTriggerAnimation] = useState(false)
    const [showFarmerInfo, setFarmerInfo] = useState(false)
    const userInfo  = useContext(UserContext)
    const socket = useContext(Socket)
    /*  */
    console.log(bookmarks)
    useEffect(() => {
        if(bookmarks){
            console.log(bookmarks)
            setClientBookmarks(bookmarks)
            console.log(clientBookmarks)
            setTimeout(() => {
                setTriggerAnimation(true)
            },4000)
        }
    },[bookmarks])
    /*  */
    const farmerInfo = async(farmerId) => {
        const farmerData =  await GetFarmerInfo(farmerId)
        if(farmerData){
            setFarmerInformation(farmerData)
            setTimeout(() => {
                setFarmerInfo(true)
            },200)
        }
        console.log(farmerInformation)
    }
    const deleteBookmark = async(userInfo,id) => {
        const result = await deleteBookMrk(userInfo, id);
        const message =  `you deleted a bookmarked  produce with this id ${result}`
        if(socket){
            socket.emit('notification',{userInfo,result,message})
        }
        const updateBookmark =  clientBookmarks.filter((bookmark) => bookmark._id !== id)
        setClientBookmarks(updateBookmark)
    }
    const trigger = () => {
        setFarmerInfo(false)
      }
  return (
    <>
    {!triggerAnimation && (
        <>
        <SpinnerLoader/>
        <Rotate/>
        </>
    )}
   {triggerAnimation && !showFarmerInfo && (
        <>
        <section className='bookmark-grid'>
        {clientBookmarks && clientBookmarks.length > 0 && clientBookmarks.map((bookmark,index) => (
            <section key={index} className='bookmark'>
                <aside>
                <div style={{
                    width: '100%',
                    height: '250px'
                }}>
                <ImageSlider images={bookmark.Image}/>
                </div>
                    
                </aside>
               
               {bookmark !== null && (
                <>
                 <main className='bookmark-produce'>
                    <div>
                    <h2>{bookmark.title}</h2>
                    <h3>#{bookmark.price}</h3>
                    </div>
                    <p>{bookmark.description}</p>
                    <ul>
                    <li>Quantity: {bookmark.quantity}</li>
                    <li><i class="fa-solid fa-location-dot"></i>{bookmark.location}</li>
                    </ul>
                    <p>{new Date(bookmark.date).toLocaleDateString('en-US', { weekday: 'long',
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',})}</p>
                </main>
                <div className='produce_button'>
                <button onClick={() => farmerInfo(bookmark._id)}>Get Farmer Information</button>
                <button onClick={() => deleteBookmark(userInfo,bookmark._id)}>Delete Bookmark</button>
                </div>
                </>
               )}
            </section>
        ))}
    </section>
    {clientBookmarks.length === 0 && (
        <div>
            <h1>No Bookmark</h1>
        </div>
    )}
    </>
    )}
    {triggerAnimation && showFarmerInfo && (
        <ShowProduceInfo data={farmerInformation} trigger={trigger} />
    )}
    </>
  )
}

export default ClientBookmarks