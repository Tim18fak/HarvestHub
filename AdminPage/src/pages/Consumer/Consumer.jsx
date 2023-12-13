import React,{useState,useEffect} from 'react'
import Loader from '../../components/anims/loader/Loader'

const Consumer = ({HHConsumer,state}) => {
  const [triggerAnim,setTriggerAnim] = useState(state)
  const [consumer,setConsumer] =  useState([])
  useEffect(() => {
    if(HHConsumer){
     setConsumer(HHConsumer)
     setTimeout(() => {
       setTriggerAnim(false)
     },3000)
    }
   },[HHConsumer])
   if(triggerAnim) return <Loader/>
  return (
    <>
    <section>
      {consumer && consumer.length > 0 && consumer.map((value,index) => (
        <main key={index}>
          <figure>
          <img src={value.profileImage} alt="" />
          <h2>{value.fullname}</h2>
        </figure>
        </main>
      ))}
    </section>
    <section>
      {consumer.length === 0 && (
        <div>No Consumer Found in the Database</div>
      )}
      </section>
    </>
  )
}

export default Consumer