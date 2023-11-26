import React, { useState } from 'react';



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
  const [produceInfo, setProduceInfo] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);


  const getproduceInfo = (e) => {
    const {value} = e.target
    setProduceInfo(value);
  };
console.log(selectedCategories)
  const addProduceInfoUi = (category) => {
    // Check if the category is not already selected
    if (!selectedCategories.find((selectedCategory) => selectedCategory.name === category)) {
      setSelectedCategories([...selectedCategories, { id: Date.now(), name: category }]);
    }
  };

  const removeProduceInfoUi = (id) => {
    const updatedCategories = selectedCategories.filter((category) => category.id !== id);
    setSelectedCategories(updatedCategories);
  };

  const submitSearch = (e) => {
    e.preventDefault()
    const url  = 'http://localhost/client/searchproduct'
    fetch(url,{
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({'searchTitle': produceInfo, 'selectedCategories': selectedCategories})
    })

  }
  return (
    <>
      <form onSubmit={submitSearch}>
        <input type="text" name="" placeholder="search produce" id="title" onChange={getproduceInfo} />
        <main>
          {selectedCategories.map((category) => (
            <div key={category.id}>
              {category.name}
              <button type="button" onClick={() => removeProduceInfoUi(category.id)}>
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
    </>
  );
};

export default ClientDashboard;
