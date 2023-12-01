import React, { useEffect, useState } from 'react'
import { GetFarmerInfo } from '../../../../configs/consumer__configs/fetch'
import ShowProduceInfo from '../ShowProduceAndFarmerInfo/ShowProduceInfo'

const ProduceResponse = ({produce}) => {
    console.log(produce)
    const [searchProduce,setSearchProduce] = useState([])
    const [produceImage,setProduceImage] = useState([])
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
    const getFarmerData = async(id) => {
      const results = await GetFarmerInfo(id)
      if(results){
        setFarmerData(results)
      }
    }
    const bookMark = (id) => {
      console.log(id)
  }
  return (
    <>
    <aside>
      {searchProduce.length === 0 && (
        <div>hhhh</div>
      )}
    </aside>
    <section>
  {searchProduce.length > 0 && (
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
  <ShowProduceInfo data={farmerData}/>
    </>
  )
}

export default ProduceResponse
