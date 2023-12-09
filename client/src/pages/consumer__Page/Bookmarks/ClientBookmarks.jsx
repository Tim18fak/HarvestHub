import React, { useEffect, useState,useContext } from 'react'
import { GetFarmerInfo, deleteBookMrk } from '../../../../configs/consumer__configs/configs'
import ShowProduceInfo from '../ShowProduceAndFarmerInfo/ShowProduceInfo'
import SpinnerLoader from '../../../anim/Loaders/SpinnerLoader'
import { Socket, UserContext } from '../../../../hooks/useContext/ConsumerInfo'

const ClientBookmarks = ({bookmarks}) => {
    const [clientBookmarks,setClientBookmarks] = useState([])
    const [farmerInformation,setFarmerInformation] = useState(null)
    const [triggerAnimation,setTriggerAnimation] = useState(false)
    const [showFarmerInfo, setFarmerInfo] = useState(false)
    const userInfo  = useContext(UserContext)
    const socket = useContext(Socket)
    /*  */
    useEffect(() => {
        if(bookmarks){
            console.log(bookmarks)
            setClientBookmarks(bookmarks)
            console.log(clientBookmarks)
            setTimeout(() => {
                setTriggerAnimation(true)
            },5000)
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
        <SpinnerLoader/>
    )}
   {triggerAnimation && !showFarmerInfo && (
        <>
        <section>
        {clientBookmarks && clientBookmarks.length > 0 && clientBookmarks.map((bookmark,index) => (
            <section key={index}>
                <aside>
                    <figure>
                        {bookmark !== null && bookmark.Image && bookmark.Image.map((image,index) => (
                            <img src={image} alt="" key={index}/>
                        ))}
                    </figure>
                </aside>
               
               {bookmark !== null && (
                <>
                 <main>
                    <h2>{bookmark.title}</h2>
                    <p>{bookmark.description}</p>
                    <ul>
                    <li>{bookmark.price}</li>
                    <li>{bookmark.quantity}</li>
                    <li>{bookmark.location}</li>
                    <li>{new Date(bookmark.date).toLocaleDateString('en-US', { weekday: 'long',
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',})}</li>
                    </ul>
                </main>
                <button onClick={() => farmerInfo(bookmark._id)}>Get Farmer Information</button>
                <button onClick={() => deleteBookmark(userInfo,bookmark._id)}>Delete Bookmark</button>
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