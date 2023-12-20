import React,{useEffect, useState} from 'react'
import Loader from '../../components/anims/loader/Loader'
import { DeactivateF, activateUser } from '../../../config/getAllConsumer'
import SubLoader from '../../components/anims/subLoader/SubLoader'

const Farmer = ({HHFarmer,state}) => {
  const [triggerAnim,setTriggerAnim] = useState(state)
  const [filterName,setFilterName] = useState('')
  const [farmer,setfarmer] =  useState([])
  const [deactivateState,setDeactivate] =  useState(false)
  const [dProgress,setDProgress]  = useState(false)
  const [dMessage,setDMessage] =  useState('')
  useEffect(() => {
   if(HHFarmer){
    setfarmer(HHFarmer)
    setTimeout(() => {
      setTriggerAnim(false)
    },3000)
   }
  },[HHFarmer])
  const blockFarmer = async(id,username) => {
    const result = await DeactivateF(id)
    setDMessage(`Please wait, while ${username.toUpperCase()} is been blocked`)
    setDeactivate(true)
    setDProgress(false)
    if(result === '200'){
      setDProgress(true)
      setDMessage(`You have successfully deactivated ${username.toUpperCase()} account`)
      setTimeout(() => {
        setDeactivate(false)
      },5000)
      const updatedFarmer =  farmer.filter((value) => value._id !== id)
    setfarmer(updatedFarmer)
    }
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
    <section className='filter-farmer'>
      <input type="text" name='username' placeholder='search Farmer Username' onChange={getInputValue}/>
      <a href="#" onClick={searchLogic}>Filter By Email</a>
    </section>

    <SubLoader message={dMessage} trig={dProgress} state={deactivateState}/>

    <section className='consumer-list'>
      {farmer && farmer.length > 0 && farmer.map((value,index) => (
        <main key={index} className='consumer-individual'>
          <figure>
            <img src={value.profileImage} alt="" />
            <h2>{value.fullname}</h2>
          </figure>
          <h4>Personal Information</h4>
          <ul>
            <li><b>ID:</b>{value.Id}</li>
            <li><b>NIN</b>{value.NIN
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
            <li><b>Verification Status: </b>{value.verificationStatus}</li>
          </ul>
          <h4>Farmer's Farm Information</h4>
          <ul>
            <li><b>Farm Type: </b>{value.farmType}</li>
            <li><b>Farm Address: </b>{value.farm_Address}</li>
            <li><b>Farmer's Experience: </b>{value.farmingExperience}</li>
          </ul>
          <aside className='action-button'>
          {value.verificationStatus === 'Fullfilled' && (
            <button onClick={() => activateFarmer(value._id,value.isFarmer)}>Activate Farmer</button>
          )}
          <button onClick={() => blockFarmer(value._id,value.username)}>Deactivate Farmer</button>
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