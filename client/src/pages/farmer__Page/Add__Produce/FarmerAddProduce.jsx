import React, { useEffect, useState, useContext } from 'react'
import { UserContext } from '../../../../hooks/useContext/ConsumerInfo'

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
  category:[],
  date:'',
  title:'',
  description:'',
  location:'',
  quantity:'',
}
const FarmerAddProduce = () => {
  const [selectedImages,setSelectedImages] = useState([])
  const [err,setErr] = useState('')
  const [selectedCategories,setSelectedCategories] =  useState([])
  const [disableSubmit,setDisableSubmit] = useState(false)
  const [produce,setProduceInfo] =  useState(produceInfo)
  const [userinfo,setSetinfo] =  useState('')
  const userInfo = useContext(UserContext);

  /* getting the userInfo from the useContext hook */
  useEffect(() => {
    setSetinfo(userInfo)
  },[produce])

/* add the produce data to the formData Object */
  const produceData = new FormData();
  for (let i = 0; i < selectedImages.length; i++) {
    produceData.append("image", selectedImages[i]);
  }
  produceData.append('price',produce.price)
  produceData.append('location',produce.location)
  produceData.append('date',produce.date)
  produceData.append('description',produce.description)
  produceData.append('title',produce.title)
  produceData.append('quantity', produce.quantity)
  /* Getting the images from the Farmer device  */
  const getProduceImage = (e) => {
    const { files } = e.target;
  setSelectedImages(Array.from(files));
  }
  /* to remove the category from the ui */
  const removeCategory = (category) => {
    if(selectedCategories){
      const updatedCategories = selectedCategories.filter((value) => category !== value)
      setSelectedCategories(updatedCategories)
    }
  }
  /* to add category to the ui */
  const addCategories = (category) => {
    if(!selectedCategories.find((value) => category === value)){
      setSelectedCategories([...selectedCategories,category])
    }  
  }
  /*  to get the produce info from the user and store it in the useState variable */
  const addProduceInfo = (e) => {
    const  {name, value} =  e.target
    setProduceInfo({...produce,[name]: value})
  }
  /* the submit the produce info to the back end */
const uploadProduce = (e) => {
  e.preventDefault()
 try{
  const url = `http://localhost/farmerUser/testProduce/${userInfo}`
  if(!selectedImages){
    alert("Please select an image to upload.");
  }
  for(let i = 0;i < selectedCategories.length;i++){
    produce.category.push(selectedCategories[i])
  }
  produceData.append('category',produce.category)
  console.log(produce)
 }
 catch(err){

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
    <section>
    {selectedImages.length === 0 ? (
    <p>No images selected</p>
  ) : (
    selectedImages.map((image, index) => (
      <figure key={index}>
        <img src={URL.createObjectURL(image)} alt="" />
      </figure>
    ))
  )}
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
      <button>Add Produce</button>
    </form>
    </>
  )
}

export default FarmerAddProduce
