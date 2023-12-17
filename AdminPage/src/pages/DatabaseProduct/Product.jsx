import React, { useEffect, useState } from 'react'
import Loader from '../../components/anims/loader/Loader'
import { getFarmerinfo } from '../../../config/getAllConsumer'

const produceFilter = {
  text: '',
  minPrice: '',
  maxPrice: '',
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
        const filterProduce = produce.filter((value) => value.price >= filterInput.minPrice && value.price <= filterInput.maxPrice)
        setProduce(filterProduce)
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
    <section>
      {!priceFilter && (
        <>
        <a href="#" onClick={refresh}>Back</a>
        <aside>
        <input type="text" placeholder='Filter Produce' name='text' onChange={getFilterInput} id='filter' />
        <label htmlFor="filter" onClick={triggerFilter} >Filter Produce</label>
        </aside>
        </>
      )}
      {priceFilter && (
        <aside>
           <a href="#" onClick={refresh}>Back</a>
        <div>
        <input type="number" name='minPrice' placeholder='min-price' onChange={getFilterInput}/>
        <input type="number" name='maxPrice' placeholder='max-price' onChange={getFilterInput} />
        </div>
        <label  onClick={triggerFilter}>Filter</label>
      </aside>
      )}
      <div>
        <h4>Filter Produce</h4>
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

    <section>
      <main>
        {produce && produce.map((value,index) => (
          <>
          <figure>
              {value.Image && value.Image.length > 0 && value.Image.map((image,index) => (
                <img src={image} key={index} alt="" width={300} height={200}/>
              ))}
              <article>
              <h2>{value.title}</h2>
              <b>#{value.price}</b>
              </article>
              <p>Description: {value.description}</p>
              <ul>
                <li>Quantity: {value.quantity}</li>
                <li>Location: {value.location}</li>
              </ul>
          </figure>
          <div key={index}>
            <a href="#" onClick={() => getFarmerInfo(value.Farmer)}>View Farmer Info</a>
          </div>
          </>
        )
        )}
        {produce.length === 0 && (
          <div>
            <p>No produce found matching your filter parameters</p>
          </div>
        )}
        </main>
    </section>
    
    </>
  )
}

export default Product;