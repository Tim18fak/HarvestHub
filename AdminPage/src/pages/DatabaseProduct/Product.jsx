import React, { useEffect, useState } from 'react'
import Loader from '../../components/anims/loader/Loader'
import { getFarmerinfo } from '../../../config/getAllConsumer'
import Carousel from '../../components/ImageSlider/Carousel'
import './produce.css'
const produceFilter = {
  text: '',
  minPrice: '',
  maxPrice: '',
}

const ShowFarmer = ({farmerInfo,state,setState}) => {
  const [farmerData,setData] = useState([])
  useEffect(() => {
    if(farmerInfo){
      setData(farmerInfo)
    }
  },[farmerInfo])
  console.log(state)

  const closeProfileCard = () => {
    setState(false)
  }
  return (
    <>
    <input type="checkbox" id='profile-card' checked={state} />
    <section className='profile-card'>
      <nav>
        <label htmlFor="profile-card" onClick={closeProfileCard}><i class="fa-solid fa-x fa-beat"></i></label>
      </nav>
      <img src={farmerData.profileImage} alt="profileImage" />
      <main>
        <h2>{farmerData.fullname}</h2>
        <h3>{farmerData.address}</h3>
        <p>{farmerData.Id}</p>
        <ul>
          <li>{farmerData.NIN}</li>
          <li>{farmerData.verificationStatus}</li>
        </ul>
        <article className='contact'>
          <a href={`tel:+${farmerData.phoneNumber}`}><i class="fa-solid fa-phone fa-shake"></i></a>
          <a href={`mailto:${farmerData.email}`}><i class="fa-solid fa-envelope fa-shake"></i></a>
        </article>
      </main>
    </section>
    </>
  )
}

const Product = ({HHProduce,state}) => {
  const [triggerAnim,setTriggerAnim] = useState(state)
  const [subAnim,setSubAnim] = useState(true)
  const [triggerSubAnim,setTriggerSubAnim] = useState(false)
  const [produce,setProduce] = useState([])
  const [farmerInfo,setFarmerInfo] = useState([])
  const [filterState,setFilterState] = useState('')
  const [filterInput,setfilterInput] = useState(produceFilter)
  const [priceFilter,setPriceFilter] = useState(false)
  const [showFarmer,setShowFarmer] =  useState(false)

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
      setShowFarmer(true)
      console.log(showFarmer)
      console.log(farmerInfo)
    }
  }

  const filterBasedOnPrice = () => {
    setPriceFilter(true)
    setFilterState('price')
  }
  const filterBasedOnLocation = () => {
    setPriceFilter(false)
    setFilterState('location')
  }
  const getFilterInput  = (e) => {
    const {name,value} =  e.target
    setfilterInput({...filterInput,[name]: value})
    console.log(filterInput)
  }
  const filterBasedOnName = () => {
    setFilterState('name')
    setPriceFilter(false)
  }
  const triggerFilter = () => {
    if(filterState === 'name'){
      const filterProduce = produce.filter((value) => {
        return(
          value.title.includes(filterInput.text)
        )
      })
      setProduce(filterProduce)
    }else if(filterState === 'price'){
      const result = []
        const filterProduce = produce.filter((value) => {
          const minprice = parseInt(filterInput.minPrice)
          const maxprice = parseInt(filterInput.maxPrice)
          if(value.price >= minprice && value.price <= maxprice){
            result.push(value)
          }
        })
        setProduce(result)
    }else if(filterState === 'location'){
      const filterProduce = produce.filter((value) => {
        return (
          value.location.includes(filterInput.text)
        )
      })
      setProduce(filterProduce)
    }
  }

  const refresh = () => {
    setProduce(HHProduce)
  }
  if(triggerAnim) return <Loader/>
  return (
    <>
    <a href="#" onClick={refresh}>Back</a>
    <section className='produce-filter'>
      {!priceFilter && (
        <>
        <aside>
        <input type="text" placeholder='Filter Produce' name='text' onChange={getFilterInput} id='filter' />
        <label htmlFor="filter" onClick={triggerFilter} >Filter</label>
        </aside>
        </>
      )}
      {priceFilter && (
        <aside>
        <div className='price-filter'>
        <input type="number" name='minPrice' placeholder='min-price' onChange={getFilterInput}/>
        <input type="number" name='maxPrice' placeholder='max-price' onChange={getFilterInput} />
        </div>
        <label  onClick={triggerFilter}>Filter</label>
      </aside>
      )}
      <div>
        <h4>Filter produce based on:</h4>
        <ul>
        <p><input type="radio" name="filter" onChange={filterBasedOnName} id="title"/>
        <label htmlFor="title" onClick={filterBasedOnName}>Name</label></p>
          <p><input type="radio" name="filter" onChange={filterBasedOnPrice} id="price" />
          <label htmlFor="price" onClick={filterBasedOnPrice}>Price</label></p>
          <p><input type="radio" name="filter" onChange={filterBasedOnLocation} id="location" />
          <label htmlFor="location" onClick={filterBasedOnLocation}>Location</label></p>
        </ul>
      </div>
    </section>

      <section className='profile'>
        <ShowFarmer farmerInfo={farmerInfo} state={showFarmer} setState={setShowFarmer}/>
      </section>

        <section className='produce-data'>
          {produce && produce.length >  0 && produce.map((value,index) => (
            <>
            <div className='produce-card'>
             <figure>
              <Carousel produce={value}/>
             </figure>
              <main>
              <div className='basic-info'>
              <h2>{value.title}</h2>
              <b>#{value.price}</b>
              </div>
              <p>Description: {value.description}</p>
              <ul>
                <li>Quantity: {value.quantity}</li>
                <li>Location: {value.location}</li>
              </ul>
              </main>
              <button className='getFarmerInfo' onClick={() => getFarmerInfo(value.Farmer)}>View Farmer Info</button>
            </div>
              </>
          ))}
        </section>
    </>
  )
}

export default Product;