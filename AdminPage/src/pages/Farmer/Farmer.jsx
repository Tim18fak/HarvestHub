import React,{useEffect, useState} from 'react'
import Loader from '../../components/anims/loader/Loader'

const Farmer = ({HHFarmer,state}) => {
  const [triggerAnim,setTriggerAnim] = useState(state)
  const [farmer,setfarmer] =  useState([])
  useEffect(() => {
   if(HHFarmer){
    setfarmer(HHFarmer)
    setTimeout(() => {
      setTriggerAnim(false)
    },3000)
   }
  },[HHFarmer])
  const blockFarmer = (id) => {
    const updatedFarmer =  farmer.filter((value) => value._id !== id)
    setfarmer(updatedFarmer)
  }
  if(triggerAnim) return <Loader/>
  return (
    <>
    <section>
      {farmer && farmer.length > 0 && farmer.map((value,index) => (
        <main key={index}>
          <figure>
            <img src={value.profileImage} alt="" />
          </figure>
          <h3>{value.fullname}</h3>
          <ul>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
          <button onClick={() => blockFarmer(value._id)}>Block Farmer</button>
        </main>
      ))}
    </section>
    {farmer.length === 0 && (
      <div>No Farmer User In The Database</div>
    )}
    </>
  )
}

export default Farmer