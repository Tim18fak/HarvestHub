import React, { useEffect, useState } from 'react'
import { GetFarmerInfo } from '../../../../configs/consumer__configs/configs'
import ShowProduceInfo from '../ShowProduceAndFarmerInfo/ShowProduceInfo'
import './produce.css'
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
      {searchProduce.length === 0 && (
        <div className='produce-none'>
          <h3>No produce found</h3>
          <p>Try again</p>
        </div>
      )}
    <section>
  {searchProduce.length > 0 && !showFarmerInfo && (
    <main className='search-produce'>
      {searchProduce.map((produce, index) => (
        <div key={index} className='produce-card'>
             <aside>
              <img src={produce.Image[0]} alt=""  className='produceImages'/>
          </aside>
          <article>
          <h2>{produce.title}</h2>
          <h3>#{produce.price}</h3>
          </article>
          <main>
          <p>{produce.description}</p>
          <ul>
            <li>Quantity: {produce.quantity}</li>
            <li><i class="fa-solid fa-location-dot"></i>{produce.location}</li>
          </ul>
          <p>{new Date(produce.date).toLocaleDateString('en-US', { weekday: 'long',
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',})}</p>
          <ul>
            {produce && produce.category.map((category,index) => {
                <li key={index}>{category}</li>
            })}
          </ul>
          </main>
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
