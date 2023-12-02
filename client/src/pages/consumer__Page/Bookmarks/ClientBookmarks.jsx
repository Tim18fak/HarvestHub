import React, { useEffect, useState } from 'react'
import { GetFarmerInfo } from '../../../../configs/consumer__configs/configs'
import ShowProduceInfo from '../ShowProduceAndFarmerInfo/ShowProduceInfo'
import SpinnerLoader from '../../../anim/Loaders/SpinnerLoader'

const ClientBookmarks = ({bookmarks}) => {
    const [clientBookmarks,setClientBookmarks] = useState([])
    const [farmerInformation,setFarmerInformation] = useState(null)
    const [triggerAnimation,setTriggerAnimation] = useState(false)
    /*  */
    useEffect(() => {
        if(bookmarks){
            console.log('loo')
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
        }
    }
  return (
    <>
    {!triggerAnimation && (
        <SpinnerLoader/>
    )}
   {triggerAnimation && (
        <>
        <section>
        {/* {clientBookmarks && clientBookmarks.map((bookmark,index) => (
            <main key={index}>
                <button onClick={() => farmerInfo(bookmark._id)}>Get Farmer Information</button>
            </main>
        ))} */}
    </section>
    </>
    )} 
    </>
  )
}

export default ClientBookmarks