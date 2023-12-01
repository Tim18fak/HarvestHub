import React, { useEffect, useState } from 'react';
import ProduceResponse from '../Produce_Response/ProduceResponse';
import { cookie } from '../../../../configs/default__configs/cookies';


const cropType = {
  Cereals: '',
  Pulses: '',
  Fruits: '',
  Vegetables: '',
  Oilseeds: '',
  Tubers: '',
  Spices: '',
};

const ClientDashboard = () => {
  const [resProduct,setResProduct] = useState([])
  const [produceInfo, setProduceInfo] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    const username = cookie.get('username')
    if(username){
    }
  },[])
  const getproduceInfo = (e) => {
    const {value} = e.target
    setProduceInfo(value);
  };

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
      <form onSubmit={submitSearch}>
        <input type="text" name="" placeholder="search produce" id="title" onChange={getproduceInfo} />
        <main>
          {selectedCategories.map((category,id) => (
            <div key={id}>
              {category}
              <button type="button" onClick={() => removeProduceInfoUi(category)}>
                +
              </button>
            </div>
          ))}
        </main>
        <button onClick={submitSearch}>search Produce</button>
      </form>
      <section>
        <h2>Category</h2>
        <aside>
          <div>
            <h3>Based on crop type</h3>
            <div>
              <ul>
                {Object.keys(cropType).map((crop, index) => (
                  <li key={index} onClick={() => addProduceInfoUi(crop)}>
                    {crop}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            <h3>Livestock Products</h3>
            <ul>
              <li onClick={() => addProduceInfoUi('Meat')}>Meat</li>
              <li onClick={() => addProduceInfoUi('Dairy')}>Dairy</li>
              <li onClick={() => addProduceInfoUi('Eggs')}>Eggs</li>
            </ul>
          </div>
          {/* Add more categories as needed */}
        </aside>
      </section>
      <ProduceResponse produce={resProduct}/>
    </>
  );
};

export default ClientDashboard;
