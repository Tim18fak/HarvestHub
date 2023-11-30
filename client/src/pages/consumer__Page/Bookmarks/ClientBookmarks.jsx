import React, { useState } from 'react'
import { GetFarmerInfo } from '../../../../configs/consumer__configs/fetch'
import ShowProduceInfo from '../ShowProduceAndFarmerInfo/ShowProduceInfo'

const ClientBookmarks = ({bookmarks}) => {
    const [clientBookmarks,setClientBookmarks] = useState([])
    const [farmerInformation,setFarmerInformation] = useState(null)

    const farmerInfo = async(farmerId) => {
        const farmerData =  await GetFarmerInfo(farmerId)
        if(farmerData){
            setFarmerInformation(farmerData)
        }
    }
  return (
    <>
    <section>
        {clientBookmarks && clientBookmarks.map((bookmark,index) => (
            <main key={index}>
                <button onClick={() => farmerInfo(bookmark._id)}>Get Farmer Information</button>
            </main>
        ))}
    </section>
    </>
  )
}

export default ClientBookmarks