import React, { useEffect, useState } from 'react'

const cropCategory = {
  Cereals: '',
  Pulses: '',
  Fruits: '',
  Vegetables: '',
  Oilseeds: '',
  Tubers: '',
  Spices: '',
} 
const livestockCategory = {
  Meat:'',
  Egg:'',
  Diary:''
}
const produceInfo =  {
  price: '',
  category:'',
  date:'',
  title:'',
  description:'',
  location:'',
  quantity:'',
}
const FarmerAddProduce = () => {
  const [selectedImages,setSelectedImages] = useState('')
  const [err,setErr] = useState('')
  const [selectedCategories,setSelectedCategories] =  useState([])
  const [disableSubmit,setDisableSubmit] = useState(false)
  const [produce,setProduceInfo] =  useState(produceInfo)

  useEffect(() => {
    if(selectedImages > 3){
      setErr('Please only pick 5 best images of your product')
      setDisableSubmit(true)
    }
  },[selectedImages])

  const formData = new FormData();
  for (let i = 0; i < selectedImages.length; i++) {
    formData.append("image", selectedImages[i]);
  }
  /* Getting the images from the Farmer device  */
  const getProduceImage = (e) => {
    const {files} = e.target
    if(files.length < 5){
      setSelectedImages('')
    }
    console.log(files.length)
    setSelectedImages(files)
  }
  const removeCategory = (category) => {
    if(selectedCategories){
      const updatedCategories = selectedCategories.filter((value) => category !== value)
      setSelectedCategories(updatedCategories)
    }
  }
  const addCategories = (category) => {
    if(!selectedCategories.find((value) => category === value)){
      setSelectedCategories([...selectedCategories,category])
    }  
  }
  const addProduceInfo = (e) => {
    const  {name, value} =  e.target
    setProduceInfo({...produce,[name]: value})
  }
const uploadProduce = () => {
  e.preventDefault()
  if(!selectedImages){
    
  }

}
  return (
    <>
    <section>
      <aside>
        <h3>Add a category</h3>
        {selectedCategories.map((category,index) => (
          <p key={index} >{category}
          <span onClick={() => removeCategory(category)}>-</span>
          </p>
        ))}
      </aside>
      <main>
        <div>
        <h3>Crop Category</h3>
        {Object.keys(cropCategory).map((selectCategory,index) => (
          <li key={index} onClick={() => addCategories(selectCategory)}>{selectCategory}</li>
        ))}
        </div>
        <div>
          <h3>LiveStock Catergory</h3>
          {Object.keys(livestockCategory).map((selectCategory,index) => (
          <li key={index} onClick={() => addCategories(selectCategory)}>{selectCategory}</li>
        ))}
        </div>
      </main>
    </section>
    <form action="" onSubmit={uploadProduce}>
      <aside>
            <input type="file" multiple onChange={getProduceImage}/>
      </aside>
      <main>
            <div>
              <input type="text" name='title' placeholder='Title' onChange={addProduceInfo}/>
              <label htmlFor="title">Title</label>
            </div>
            <div>
              <input type="text" name='description' placeholder='Description' onChange={addProduceInfo}/>
              <label htmlFor="description">Description</label>
            </div>
            <div>
              <input type="text" name='location' placeholder='Location' onChange={addProduceInfo}/>
              <label htmlFor="location">Location</label>
            </div>
            <div>
              <input type="date" name='date' placeholder='Date' onChange={addProduceInfo}/>
              <label htmlFor="date">Date</label>
            </div>
            <div>
              <input type="number" name='quantity' placeholder='Quantity' onChange={addProduceInfo}/>
              <label htmlFor="quantity">Quantity</label>
            </div>
            <div>
              <input type="number" name='price' placeholder='Price Tag' onChange={addProduceInfo}/>
              <label htmlFor="price">Price Tag</label>
            </div>
      </main>
    </form>
    </>
  )
}

export default FarmerAddProduce
