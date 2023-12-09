import React, { useEffect, useState } from 'react'
import { GetFarmerInfo } from '../../../../configs/consumer__configs/configs'
import ShowProduceInfo from '../ShowProduceAndFarmerInfo/ShowProduceInfo'

const ProduceResponse = ({produce}) => {
    console.log(produce)
    const [searchProduce,setSearchProduce] = useState([])
    const [showFarmerInfo, setFarmerInfo] = useState(false)
    const [farmerData,setFarmerData] = useState([])
    useEffect(() => {
        if(produce){
            setSearchProduce(produce)
            console.log(produce)
        }
    },[produce])
    useEffect(() => {
      console.log(farmerData) 
    },[farmerData])
    
    /* fetch the farmer info from our database */
    const getFarmerData = async(id) => {
      const results = await GetFarmerInfo(id)
      if(results){
        console.log(results)
        setFarmerData(results)
        setTimeout(() => {
          setFarmerInfo(true)
        },200)
      }
    }
    const trigger = () => {
      setFarmerInfo(false)
    }
  return (
    <>
    <aside>
      {searchProduce.length === 0 && (
        <div>No produce found</div>
      )}
    </aside>
    <section>
  {searchProduce.length > 0 && !showFarmerInfo && (
    <main>
      {searchProduce.map((produce, index) => (
        <div key={index}>
             <aside>
            {produce && produce.Image.map((image, imgIndex) => (
              <figure key={imgIndex}>
                <img src={image} alt="" />
              </figure>
            ))}
          </aside>
          <h2>{produce.title}</h2>
          <p>{produce.description}</p>
          <h4>{produce.location}</h4>
          <ul>
            <li>{produce.price}</li>
            <li>{produce.quantity}</li>
            <li>{new Date(produce.date).toLocaleDateString('en-US', { weekday: 'long',
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',})}</li>
          </ul>
          <ul>
            {produce && produce.category.map((category,index) => {
                <li key={index}>{category}</li>
            })}
          </ul>
         <button onClick={() => getFarmerData(produce._id)}>Get Farmer Info</button>
        </div>
      ))}
    </main>
  )}
</section>
  {showFarmerInfo && (
    <ShowProduceInfo data={farmerData} trigger={trigger}/>
  )}
    </>
  )
}

export default ProduceResponse
