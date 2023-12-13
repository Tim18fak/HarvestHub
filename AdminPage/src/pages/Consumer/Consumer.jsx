import React,{useState,useEffect, useContext} from 'react'
import Loader from '../../components/anims/loader/Loader'
import { activateUser } from '../../../config/getAllConsumer'
import { Socket } from '../../../hooks/usecontext/useContext'

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
   const blockConsumer = (id) => {

   }
   const activatedConsumer = async(id,isFarmer) => {
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
    <section>
      <input type="text" name='username' placeholder='search Farmer Username' onChange={getInputValue}/>
      <a href="#" onClick={searchLogic}>Filter By Email</a>
    </section>
    <section>
      {consumer && consumer.length > 0 && consumer.map((value,index) => (
        <main key={index}>
          <figure>
          <img src={value.profileImage} alt="" />
          <h2>{value.fullname}</h2>
        </figure>
        <h4>Personal Information</h4>
          <ul>
            <li>ID {value.Id}</li>
            <li><span>NIN</span>{value.NIN
}</li>
            <li><span>Activation Code Status: </span>{value.activationCodeStatus}</li>
            <li><span>Email: </span>{value.email}</li>
            <li><span>Cell: </span>{value.phoneNumber}</li>
            <li><span>Verification Status: </span>{value.verificationStatus
}</li>
          </ul>
          <aside>
          <button onClick={() => activatedConsumer(value._id,value.isFarmer)}>Activated Consumer</button>
          <button onClick={() => blockConsumer(value._id,value.isFarmer)}>Block Consumer</button>
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