import React, { useEffect, useState } from 'react'
import SpinnerLoader from '../../../anim/Loaders/SpinnerLoader'

const ShowProduceInfo = ({data}) => {
    const [fetchData,setFetchData] = useState([])
    const [triggerAnimation,setTriggerAnimation] = useState(false)
    useEffect(() => {
        if(data){
            setFetchData(data)
            console.log(data)
            setTimeout(() => {
                setTriggerAnimation(true)
            },5000)
        }
    },[data])
    if(triggerAnimation === false) return <SpinnerLoader/>
  return (
    <>
    <section>
        {/* produce info */}
        <main>
            <figure>
                {fetchData.length > 0 && fetchData.Image.map((image,index) => (
                    <img src={image} key={index} alt="" />
                ))}
            </figure>
            <h3>{fetchData.title}</h3>
            <p>{fetchData.description}</p>
            
        </main>
        {/* farmer info */}
        <aside>
            <h3>Farmer Information</h3>
            <h2>{fetchData.username}</h2>
            <h3>{fetchData.fullname}</h3>
        </aside>
    </section>
    </>
  )
}

export default ShowProduceInfo