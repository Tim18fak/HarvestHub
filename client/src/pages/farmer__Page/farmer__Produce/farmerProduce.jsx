import React, { useEffect, useState } from 'react'
import Animation from '../../default__Pages/Animation'
import { DeleteProduce } from '../../../../configs/farmer_configs/fetch'


const FarmerProduce = ({state,farmerProduce}) => {
  const [produces,setProduces] = useState(farmerProduce)
  const [deleteproduce,setDeleteProduce] = useState([])

  useEffect(() => {
    setProduces(farmerProduce)
  },[farmerProduce])
  const deleteProduce = async(id) => {
    const data = await DeleteProduce(id)
    if(data === 200){
      const updatedProduce =  produces.filter((value) => value._id !== id)
      setProduces(updatedProduce)
    }
  }
  if(!state) return <Animation/>
  return (
    <>
    {produces.length === 0  && (
      <div>No Produce</div>
    )}
    {produces.length > 0 && (
      <section>
      {produces.map((produce,index) => (
        <div key={index}>
          <main>
            {produce.Image.map((image,index) => (
             <figure key={index}>
              <img src={image} alt="" />
             </figure>
            ))}
          </main>
          <h1>{produce.title}</h1>
          <main>
          <h2>{produce.date}</h2>
          <p>{produce.description}</p>
          <h4>{produce.location}</h4>
          <h4>{produce.quantity}</h4>
          <h4>{produce.price}</h4>
          </main>
          <aside>
            <h4>Categories</h4>
            <ul>
              {produce.category.map((value, Index) => (
                <li key={Index}>{value}</li>
              ))}
            </ul>
          </aside>
          <button onClick={() => deleteProduce(produce._id)}>Delete Produce</button>
        </div>
      ))}
    </section>
    )}
    </>
  )
}

export default FarmerProduce