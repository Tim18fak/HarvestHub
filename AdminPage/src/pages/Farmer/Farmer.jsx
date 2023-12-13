import React,{useEffect, useState} from 'react'
import Loader from '../../components/anims/loader/Loader'
import { activateUser } from '../../../config/getAllConsumer'

const Farmer = ({HHFarmer,state}) => {
  const [triggerAnim,setTriggerAnim] = useState(state)
  const [filterName,setFilterName] = useState('')
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
  const activateFarmer = async(id,isFarmer) => {
    const result =  await activateUser(id,isFarmer)

    switch(result){
      case 200:
        alert('You have activated the consumer account')
         setTimeout(() => {
          window.location.replace('/dashboard')
        },1000)
        break;
      case 300:
        alert('Consumer account has already been activated')
        break;
      default:
    }
  }
  const getInputValue = (e) => {
    const {name,value} = e.target
    setFilterName(value)
  }
  const searchLogic = () => {
    const searchFilter =  farmer.filter((value) => value.fullname === filterName)
    setfarmer(searchFilter)
  }
  const refresh = () => {
    setfarmer(HHFarmer)
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
      {farmer && farmer.length > 0 && farmer.map((value,index) => (
        <main key={index}>
          <figure>
            <img src={value.profileImage} alt="" />
          </figure>
          <h3>{value.fullname}</h3>
          <h4>Personal Information</h4>
          <ul>
            <li>ID {value.Id}</li>
            <li><span>NIN</span>{value.NIN
}</li>
            <li><span>Activation Code Status: </span>{value.activationCodeStatus}</li>
            <li><span>Email: </span>{value.email}</li>
            <li><span>Cell: </span>{value.phoneNumber}</li>
            <li><span>Verification Status: </span>{value.verificationStatus}</li>
          </ul>
          <h4>Farmer's Farm Information</h4>
          <ul>
            <li><span>Farm Type: </span>{value.farmType}</li>
            <li><span>Farm Address: </span>{value.farm_Address}</li>
            <li><span>Farmer's Experience: </span>{value.farmingExperience}</li>
          </ul>
          <aside>
          {value.verificationStatus === 'Fullfilled' && (
            <button onClick={() => activateFarmer(value._id,value.isFarmer)}>Activate Farmer</button>
          )}
          <button onClick={() => blockFarmer(value._id)}>Deactivate Farmer</button>
          </aside>
        </main>
      ))}
    </section>
    {farmer.length === 0 && (
      <div>No Farmer  Found</div>
    )}
    </>
  )
}

export default Farmer