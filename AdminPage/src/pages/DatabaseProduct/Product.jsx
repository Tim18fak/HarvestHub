import React, { useEffect, useState } from 'react'
import Loader from '../../components/anims/loader/Loader'
import { getFarmerinfo } from '../../../config/getAllConsumer'

const Product = ({HHProduce,state}) => {
  const [triggerAnim,setTriggerAnim] = useState(state)
  const [subAnim,setSubAnim] = useState(true)
  const [triggerSubAnim,setTriggerSubAnim] = useState(false)
  const [produce,setProduce] = useState([])
  const [farmerInfo,setFarmerInfo] = useState([])
  useEffect(() => {
    setProduce(HHProduce)
    setTimeout(() => {
      setTriggerAnim(false)
    },3000)
  },[HHProduce])

useEffect(() => {
  if(farmerInfo){
    setTriggerSubAnim(true)
  setTimeout(() => {
    setSubAnim()
  },3000)
  }
},[farmerInfo])
 
  /* get farmer Information */
  const getFarmerInfo = async(id) => {
    const result = await getFarmerinfo(id)
    if(result){
      setFarmerInfo(result)
      console.log(farmerInfo)
    }
  }


  if(triggerAnim) return <Loader/>
  return (
    <>
    <section>
      <main>
        {produce && produce.map((value,index) => (
          <div key={index}>
            <a href="#" onClick={() => getFarmerInfo(value.Farmer)}>View Farmer Info</a>
          </div>
        )
        )}
        </main>
      <aside>
        {/* Farmer Information */}
        {triggerSubAnim && (
            <>
            <aside>
            {subAnim && (
              <div>
                hh
              </div>
            )}
            </aside>

            {/*  */}
            <main>
            {subAnim && (
          <>
          <main>
            <figure>
              <img src={farmerInfo.profileImage} alt="" />
              <h2>{farmerInfo.fullname}</h2>
            </figure>
            <h3>Personal Information</h3>
            <ul>
              <li><b>Id</b>{farmerInfo.Id}</li>
              <li><b>Cell</b><a href={`tel:${farmerInfo.phoneNumber}`}>Call Farmer</a></li>
              <li><b>NIN</b>{farmerInfo.NIN}</li>
              <li><b>Email</b>{farmerInfo.email}</li>
              <li><b>Verification Status</b>{farmerInfo.verificationStatus}</li>
            </ul>
            <h3>Farmer's Farm Information</h3>
            <ul>
              <li><b>Farm Type</b>{farmerInfo.farmType}</li>
              <li><b>Farm Address</b>{farmerInfo.farm_Address}</li>
              <li><b>Farming Experience</b>{farmerInfo.farmingExperience} years</li>
            </ul>
          </main>
          </>

        )}
            </main>
            </>
        )}
        
        
      </aside>
    </section>
    
    </>
  )
}

export default Product;