import React, { useContext, useEffect, useState } from 'react'
import Animation from '../../default__Pages/Animation'
import { DeleteProduce } from '../../../../configs/farmer_configs/fetch'
import { Socket, UserContext } from '../../../../hooks/useContext/ConsumerInfo'
import ImageSlider from '../../../components/default__Component/ImageSlider/ImageSlider'
import './index.css'

const filterParams = {
  minprice: '',
  maxprice:  '',
  title: ''
}

const FarmerProduce = ({state,farmerProduce,menu}) => {
  const [produces,setProduces] = useState([])
  const [deleteproduce,setDeleteProduce] = useState([])
  const [showOptionInput,setOptionInput] = useState(true)
  const [filterValue,setFilterValue] = useState('')
  const [filterinput,setInput] = useState(filterParams)
  const socket  = useContext(Socket)
  const userInfo =  useContext(UserContext)

  useEffect(() => {
    setProduces(farmerProduce)
  },[farmerProduce])

  const deleteProduce = async(id,_id) => {
    const data = await DeleteProduce(id,_id)
    if(data === 200){
      const updatedProduce =  produces.filter((value) => value._id !== id)
      setProduces(updatedProduce)
      const message =  `You delete your produce with this id ${id}`
      const result =  null;
      socket.emit('notification',{userInfo,result,message})
    }
  }

  const filterByPrice = () => {
    const produceFilter = []
    produces.map((value) => {
      const minprice =  parseInt(filterinput.minprice)
      const maxprice = parseInt(filterinput.maxprice)
      if(value.price >= minprice && value.price <=maxprice){
        produceFilter.push(value)
      } 
    })
    setProduces(produceFilter)
    /* setProduces(update) */
  }
  const filterByTitle = () => {
    const update = produces.filter((value) => value.title === filterinput.title)
    console.log(update)
    setProduces(update)
    setInput('')
  }
  const getFilterOption =(val) => {
    if(val === 'name'){
      setOptionInput(true)
      setFilterValue(val)
    }else if(val === 'price'){
      setOptionInput(false)
      setFilterValue(val)
    }
    else if(val === 'location'){
      setOptionInput(true)
      setFilterValue(val)
    }
  }

  const filterInput = (e) => {
    const {name,value} =  e.target
    setInput({...filterinput,[name]:value})
    console.log(filterinput)
  }
 
  if(!state) return <Animation/>
  return (
    <>
    <input type="checkbox" name="" id="filter-btn" />
    <label htmlFor="filter-btn" className='filter-trig' style={{
      textDecoration: 'underline'
    }}>Filter</label>
    {produces.length === 0  && (
      <>
      <a href="#" onClick={() => setProduces(farmerProduce)}
      className='refresh-search'>Refresh</a>
      
      <div className='no-produce'>
        <p>No Produce</p>
      </div>
      </>
    )}
    {produces.length > 0 && (
      <>
      <a href="#" onClick={() => setProduces(farmerProduce)} className='refresh-search'>Refresh</a>
      <section className='produce-body'>
        <aside className='produce-filter'>
        {showOptionInput && (
          <>
          <div className='price-location-filter'>
          <input type="text" placeholder='filter' name='title' onChange={filterInput} />
          <label htmlFor="" onClick={filterByTitle}>Filter</label>
          </div>
          </>
        )}
        {!showOptionInput && (
          <>
          <div className='price-filter'>
          <input type="number" placeholder='min-price' name='minprice' value={filterinput.minprice} onChange={filterInput} required/>
          <input type="number" placeholder='max-price' name='maxprice' value={filterinput.maxprice} onChange={filterInput} required/>
          <button htmlFor="" onClick={filterByPrice} disabled={!filterinput.minprice && !filterinput.maxprice? true : false}>Filter</button>
          </div>
          </>
        )}
         <article className='filter-catergory'>
         <div>
         <input type="radio" name='filter' onChange={() => getFilterOption('name')} checked={filterValue === 'name'? true : false}/>
         <label htmlFor="filter" onClick={() => getFilterOption('name')}>Name</label>
         </div>
         <div>
         <input type="radio" name='filter' onChange={() => getFilterOption('price')} checked={filterValue === 'price'? true : false}/>
         <label htmlFor="filter" onClick={() => getFilterOption('price')}>Price</label>
         </div>
         <div>
         <input type="radio" name='filter' onChange={() => getFilterOption('location')} checked={filterValue === 'location'? true : false}/>
         <label htmlFor="filter" onClick={() => getFilterOption('location')}>Location</label>
         </div>
         </article>
        </aside>
        <main className='fProduce-grid'>
      {produces.map((produce,index) => (
        <div key={index}>
          <main style={{
            width:'80%',
            height: '250px'
          }} className='image-slider'>
            <ImageSlider images={produce.Image}/>
          </main>
          <aside >
          <h1>{produce.title}</h1>
          <h3>#{produce.price}</h3>
          </aside>
          <p>{produce.description}</p>
          <main>
            <ul>
              <li>{produce.quantity}</li>
              <li>{produce.location}</li>
            </ul>
          <li>{new Date(produce.date).toLocaleDateString('en-US', { weekday: 'long',
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',})}
                </li>
          </main>
          <aside>
            {produce.catergory && (
              <div>
                <h4>Categories</h4>
            <ul>
              {produce.category.map((value, Index) => (
                <li key={Index}>{value}</li>
              ))}
            </ul>
              </div>
            )}
          </aside>
          <button onClick={() => deleteProduce(produce._id,userInfo._id)} className='delete-produce'>Delete Produce</button>
        </div>
      ))}
    </main>
      </section>
    </>
    )}
    </>
  )
}

export default FarmerProduce