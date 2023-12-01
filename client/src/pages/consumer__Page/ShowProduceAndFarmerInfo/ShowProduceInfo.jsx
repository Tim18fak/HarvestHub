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
    const bookMark = (id) => {
        console.log(id)
    }
    if(triggerAnimation === false) return <SpinnerLoader/>
  return (
    <>
    <section>
        {/* produce info */}
        <h2>Hell</h2>
        <main>
            <figure>
                {fetchData.Image && fetchData.Image.length > 0 && fetchData.Image.map((image, index) => (
                            <img src={image} key={index} alt="" />
                        ))}
            </figure>
            <div>
            <h3>{fetchData.title}</h3>
            <h4>{fetchData.price}</h4>
            </div>
            <p>{fetchData.description}</p>
            <ul>
                <li>{fetchData.quantity}</li>
                <li>{new Date(fetchData.date).toLocaleDateString('en-US', { weekday: 'long',
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',})}
                </li>
                <li>{fetchData.location}</li>
                <li>{fetchData.quantity}</li>
            </ul>
            <button onClick={() => bookMark(fetchData._id)}>Bookmark</button>
        </main>
                <img src="" alt="" width={300} height={300} />
        {/* farmer info */}
        <aside>
            <main>
            <h3>Farmer Information</h3>
            <figure>
            </figure>
            <h2>{fetchData.username}</h2>
            <h3>{fetchData.fullname}</h3>
            </main>
            <aside>
                {fetchData.otherProduce && fetchData.otherProduce.length > 0 && (
                    <>
                    <h4>{fetch.username}<span>Other Produce</span></h4>
                    <main>
                        {fetchData.otherProduce && fetchData.otherProduce.length > 0 && fetchData.otherProduce.map((otherProduce,index) => (
                            <div key={index}>
                                <figure>
                                    {otherProduce.Image && otherProduce.Image.length > 0 && otherProduce.Image.map((image,index) => (
                                        <img src={image} alt=""  key={index}/>
                                    ))}
                                </figure>
                                <main>
                                    <div>
                                    <h3>{otherProduce.title}</h3>
                                    <h4>{otherProduce.price}</h4>
                                    <a></a>
                                    </div>
                                    <p>{otherProduce.description}</p>
                                    <ul>
                                        <li>{otherProduce.quantity}</li>
                                        <li>{otherProduce.location}</li>
                                         <li>{new Date(otherProduce.date).toLocaleDateString('en-US', { weekday: 'long',
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',})}</li>
                                    </ul>
                                    <button onClick={() => bookMark(otherProduce._id)}>Bookmark</button>
                                </main>
                            </div>
                        ))}
                    </main>
                    </>
                )}
            </aside>
        </aside>
    </section>
    </>
  )
}

export default ShowProduceInfo