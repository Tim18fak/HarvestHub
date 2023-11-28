import React, { useEffect, useState, useContext } from 'react'
import { UserContext } from '../../../../hooks/useContext/ConsumerInfo'
import { Axios } from '../../../../configs/default__configs/axios.config'

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
  const uploadProduce = async (e) => {
    e.preventDefault();
    try{
      const images = [];
      const url = `https://harvest-hub-git-farmerprofile-tim18fak.vercel.app/farmerUser/testProduce/${userInfo._id}`;
      for(const produceImage of selectedImages){
        const reader = new FileReader();
        reader.onload = (e) => {
          console.log(e.target.result)
          const imageData = e.target.result;
          images.push(imageData);
          if(images.length === selectedImages.length){
            const {title,description,location,price,date,quantity} =  produce
            fetch(url,{
              method: "POST",
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userInfo.accessToken}`
              },
              body: JSON.stringify({
                images: images,
                category: selectedCategories,
                title,
                description,
                location,
                price,
                date,
                quantity
              })
            })
            .then((response) => {
              console.log(response)
              if(response.status !== 204){
                alert('Upload Failed')
              }
              alert('Your Produce has been saved')
              setSelectedCategories([''])
              setSelectedImages('')
              setProduceInfo(produceInfo)
            })
            .catch((e) => {

            })
          }
        }
        reader.readAsDataURL(produceImage);
      }
    }
    catch(err){

    }
  };
  
  return (
    <>
    <section>
    <p>{err}</p>
      <aside>
        <h3>Add a category</h3>
        {selectedCategories.map((category,index) => (
          <p key={index} onClick={() => removeCategory(category)} >{category}
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
              <input type="text" name='title' placeholder='Title' onChange={addProduceInfo} value={produce.title}/>
              <label htmlFor="title">Title</label>
            </div>
            <div>
              <input type="text" name='description' placeholder='Description' value={produce.description} onChange={addProduceInfo}/>
              <label htmlFor="description">Description</label>
            </div>
            <div>
              <input type="text" name='location' placeholder='Location' onChange={addProduceInfo} value={produce.location}/>
              <label htmlFor="location">Location</label>
            </div>
            <div>
              <input type="date" name='date' placeholder='Date' onChange={addProduceInfo} value={produce.date}/>
              <label htmlFor="date">Date</label>
            </div>
            <div>
              <input type="number" name='quantity' placeholder='Quantity' onChange={addProduceInfo} value={produce.quantity}/>
              <label htmlFor="quantity">Quantity</label>
            </div>
            <div>
              <input type="number" name='price' placeholder='Price Tag' onChange={addProduceInfo} value={produce.price}/>
              <label htmlFor="price">Price Tag</label>
            </div>
      </main>
      <button>Add Produce</button>
    </form>
    </>
  )
}

export default FarmerAddProduce
