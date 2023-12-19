import React, { useEffect, useState } from 'react'
import { GetFarmerInfo } from '../../../../configs/consumer__configs/configs'
import ShowProduceInfo from '../ShowProduceAndFarmerInfo/ShowProduceInfo'
import './produce.css'

const produceFilter = {
  text: '',
  minPrice: '',
  maxPrice: '',
}

const ProduceResponse = ({produce}) => {
    console.log(produce)
    const [searchProduce,setSearchProduce] = useState([])
    const [showFarmerInfo, setFarmerInfo] = useState(false)
    const [farmerData,setFarmerData] = useState([])
    const [filterState,setFilterState] = useState('')
    const [filterInput,setfilterInput] = useState(produceFilter)
    const [priceFilter,setPriceFilter] = useState(false)
    const [filter,setFilter] =  useState(true)
    useEffect(() => {
        if(produce){
            setSearchProduce(produce)
            console.log(produce)
        }
    },[produce])
    useEffect(() => {
      console.log(farmerData) 
    },[farmerData])
    
    /* fetch the farmer info from our database */
    const getFarmerData = async(id) => {
      const results = await GetFarmerInfo(id)
      if(results){
        console.log(results)
        setFarmerData(results)
        setFilter(false)
        setTimeout(() => {
          setFarmerInfo(true)
        },200)
      }
    }
    const trigger = () => {
      setFarmerInfo(false)
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
        setSearchProduce(filterProduce)
      }else if(filterState === 'price'){
        const filterPrice = []
          produce.filter((value) => {
            const price = parseInt(value.price)
            if(price >= filterInput.minPrice && price <= filterInput.maxPrice){
              filterPrice.push(value)
            }
          })
          console.log(filterPrice)
          setSearchProduce(filterPrice)
      }else if(filterState === 'location'){
        const filterProduce = produce.filter((value) => {
          return (
            value.location.includes(filterInput.text)
          )
        })
        setSearchProduce(filterProduce)
      }
    }
    const refresh = () => {
      setSearchProduce(produce)
    }
  return (
    <>
    {searchProduce.length > 0 && filter &&(
      <>
      <a href="#" onClick={refresh} className='refresh-search'>Back</a>
       <section className='filter-query'>
       {!priceFilter && (
         <>
         <aside className='trigger-filter'>
         <input type="text" placeholder='Filter Produce' name='text' onChange={getFilterInput} id='filter' role='filter' />
         <label htmlFor="filter" onClick={triggerFilter} className='trigger'>Filter</label>
         </aside>
         </>
       )}
       {priceFilter && (
         <aside>
         <div className='price-min_max-range'>
         <input type="number" name='minPrice' placeholder='min-price' onChange={getFilterInput} role='filter'/>
         <input type="number" name='maxPrice' placeholder='max-price' onChange={getFilterInput} role='filter'/>
         </div>
         <label className='trigger' onClick={triggerFilter} >Filter</label>
       </aside>
       )}
       <div className='filter-option-container'>
         <h4>Filter Produce</h4>
         <ul className='filter-options'>
         <p><input type="radio" name="filter" onChange={filterBasedOnName} id="title"/>
         <label htmlFor="title" onClick={filterBasedOnName}>Name</label></p>
           <p><input type="radio" name="filter" onChange={filterBasedOnPrice} id="price" />
           <label htmlFor="price" onClick={filterBasedOnPrice}>Price</label></p>
           <p><input type="radio" name="filter" onChange={filterBasedOnLocation} id="location" />
           <label htmlFor="location" onClick={filterBasedOnLocation}>Location</label></p>
         </ul>
       </div>
     </section>
     </>
    )}
      {searchProduce.length === 0 && (
        <div className='produce-none'>
          <h3>No produce found</h3>
          <p>Try again</p>
        </div>
      )}
    <section>
  {searchProduce.length > 0 && !showFarmerInfo && (
    <main className='search-produce'>
      {searchProduce.map((produce, index) => (
        <div key={index} className='produce-card'>
             <aside>
              <img src={produce.Image[0]} alt=""  className='produceImages'/>
          </aside>
          <article>
          <h2>{produce.title}</h2>
          <h3>#{produce.price}</h3>
          </article>
          <main>
          <p>{produce.description}</p>
          <ul>
            <li>Quantity: {produce.quantity}</li>
            <li><i class="fa-solid fa-location-dot"></i>{produce.location}</li>
          </ul>
          <p>{new Date(produce.date).toLocaleDateString('en-US', { weekday: 'long',
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',})}</p>
          <ul>
            {produce && produce.category.map((category,index) => {
                <li key={index}>{category}</li>
            })}
          </ul>
          </main>
         <button onClick={() => getFarmerData(produce._id)}>Get Farmer Info</button>
        </div>
      ))}
    </main>
  )}
</section>
  {showFarmerInfo && (
    <ShowProduceInfo data={farmerData} trigger={trigger}/>
  )}
    </>
  )
}

export default ProduceResponse
