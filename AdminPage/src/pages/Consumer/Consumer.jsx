import React,{useState,useEffect, useContext} from 'react'
import Loader from '../../components/anims/loader/Loader'
import { activateUser } from '../../../config/getAllConsumer'
import { Socket } from '../../../hooks/usecontext/useContext'
import { DeactivateC } from '../../../config/getAllConsumer'
import './consumer.css'

const Consumer = ({HHConsumer,state}) => {
  const [triggerAnim,setTriggerAnim] = useState(state)
  const [filterName,setFilterName] = useState('')
  const [consumer,setConsumer] =  useState([])
  const socket =  useContext(Socket)
  useEffect(() => {
    if(HHConsumer){
     setConsumer(HHConsumer)
     setTimeout(() => {
       setTriggerAnim(false)
     },3000)
    }
   },[HHConsumer])

   /* block consumer logic */
   const blockConsumer = async(id,isFarmer) => {
    const result =  await DeactivateC(id,isFarmer)
    if(result){
      const updateConsumer = consumer.filter((value) => value._id !== id)
      setConsumer(updateConsumer)
    }
   }
   const activateFarmer = async(id,isFarmer) => {
    console.log(id, isFarmer)
    const result =  await activateUser(id,isFarmer)
    console.log(result)
    switch(result){
      case 200:
        alert('You have activated the consumer account')
        setTimeout(() => {
          window.location.replace('/dashboard')
        },300)
        break;
      case 300:
        alert('Consumer account has already been activated')
        break;
      default:
    }
   }
   /* get search params */
   const getInputValue = (e) => {
    const {name,value} = e.target
    setFilterName(value)
  }
   /* filter consumer based on username */
   const searchLogic = () => {
    const searchFilter =  consumer.filter((value) => value.email === filterName)
    console.log(searchFilter)
    setConsumer(searchFilter)
  }
   /* refresh logic */
   const refresh = () => {
    setConsumer(HHConsumer)
  }
   if(triggerAnim) return <Loader/>
  return (
    <>
    <a href="#" onClick={refresh}>Refresh</a>
    <section className='filter-farmer'>
      <input type="text" name='username' placeholder='search Farmer Username' onChange={getInputValue}/>
      <a href="#" onClick={searchLogic}>Filter By Email</a>
    </section>
    <section className='consumer-list'>
      {consumer && consumer.length > 0 && consumer.map((value,index) => (
        <main key={index} className='consumer-individual'>
          <figure>
          <img src={value.profileImage} alt="" />
          <h2>{value.fullname}</h2>
        </figure>
        <h4>Personal Information</h4>
          <ul>
            <li><b>ID:</b> {value.Id}</li>
            <li><b>NIN:</b>{value.NIN
}</li>
            <li><b>Activation Code Status: </b>{value.activationCodeStatus}</li>
            <li> <a href={`tel:+${value.phoneNumber}`}><i class="fa-solid fa-phone fa-shake" style={{
              fontSize: '1.5rem',
              color: 'white',
              margin: '5px'
            }}></i></a> {value.phoneNumber}</li>
            <li><a href={`mailto:${value.email}`}><i class="fa-solid fa-envelope fa-shake" style={{
              fontSize: '1.5rem',
              color: 'white',
              margin: '5px'
            }}></i></a>{value.email}</li>
            
            <li><b>Verification Status:  </b>{value.verificationStatus
}</li>
          </ul>
          <aside className='action-button'>
          {value.verificationStatus === 'Fullfilled' && (
            <button onClick={() => activateFarmer(value._id,value.isFarmer)}>Activate Farmer</button>
          )}
          <button onClick={() => blockConsumer(value._id,value.isFarmer)}>Deactivate Consumer</button>
          </aside>
        </main>
      ))}
    </section>
    <section>
      {consumer.length === 0 && (
        <div>No Consumer Found</div>
      )}
      </section>
    </>
  )
}

export default Consumer