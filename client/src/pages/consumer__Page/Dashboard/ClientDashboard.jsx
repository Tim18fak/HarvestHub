import React, { useState } from 'react';
import ProduceResponse from '../Produce_Response/ProduceResponse';

import './dashboard.css'

const cropType = {
  Cereals: '',
  Pulses: '',
  Fruits: '',
  Vegetables: '',
  Oilseeds: '',
  Tubers: '',
  Spices: '',
};

const ClientDashboard = ({menu}) => {
  const [resProduct,setResProduct] = useState([])
  const [produceInfo, setProduceInfo] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);


  const getproduceInfo = (e) => {
    const {value} = e.target
    setProduceInfo(value);
  };
console.log(selectedCategories)
  const addProduceInfoUi = (category) => {
    // Check if the category is not already selected
    if (!selectedCategories.find((selectedCategory) => selectedCategory === category)) {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const removeProduceInfoUi = (categories) => {
    const updatedCategories = selectedCategories.filter((category) => category !== categories);
    setSelectedCategories(updatedCategories);
  };

  const submitSearch = (e) => {
    e.preventDefault()
   try {
    const url  = 'http://localhost/client/searchproduct'
    fetch(url,{
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({'searchTitle': produceInfo, 'selectedCategories': selectedCategories})
    })
    .then((res) => {
      res.json()
      .then((data) => {
        console.log(data)
          setResProduct(data)
      })
      .catch((err) => {

      })
    })
    .catch((err) => {

    })
   } catch (error) {
    console.log(error.message)
   }

  }
  return (
    <>
    <input type="checkbox" checked={menu} id='trigg' />
      <form onSubmit={submitSearch} className='harvesthub_dashboard'>
        <h3>Welcome To HarvestHub</h3>
        <a className='search-product' onClick={submitSearch}><i class="fa-solid fa-magnifying-glass fa-beat"></i></a>
        <input type="text" name="" placeholder="search produce" id="title" onChange={getproduceInfo} />
      </form>
      
      <ProduceResponse produce={resProduct} menu={menu}/>
    </>
  );
};

export default ClientDashboard;
