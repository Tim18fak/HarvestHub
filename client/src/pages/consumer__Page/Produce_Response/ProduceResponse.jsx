import React, { useEffect, useState } from 'react'

const ProduceResponse = ({produce}) => {
    console.log(produce)
    const [searchProduce,setSearchProduce] = useState([])
    const [produceImage,setProduceImage] = useState([])
    useEffect(() => {
        if(produce){
            setSearchProduce(produce)
        }
    },[produce])
    console.log(produce)
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
          </ul>
          <ul>
            {produce && produce.category.map((category,index) => {
                <li key={index}>{category}</li>
            })}
          </ul>
         <button>Get Farmer Info</button>
        </div>
      ))}
    </main>
  )}
</section>

    </>
  )
}

export default ProduceResponse
