import React, { useEffect, useState, useContext } from 'react'
import { Socket, UserContext } from '../../../../hooks/useContext/ConsumerInfo'
import { Axios } from '../../../../configs/default__configs/axios.config'
import ImageSlider from '../../../components/default__Component/ImageSlider/ImageSlider'
import './addindex.css'
import './Carousel.css'
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
  const [currentIndex,setCurrentIndex] = useState(0)
  const userInfo = useContext(UserContext);
  const socket =  useContext(Socket)
  const [processImg,setImg] = useState([])
  /* getting the userInfo from the useContext hook */
  useEffect(() => {
    setSetinfo(userInfo)
  },[produce])

  const getProduceImage = (e) => {
    const { files } = e.target;
    console.log(files)
    const image = Array.from(files)
  setSelectedImages(Array.from(files));
  for(const produceImage of image){
    const process = new FileReader()
    process.onload = (e) => {
      setImg([...processImg,e.target.result])
    }
    process.readAsDataURL(produceImage)
  }
  }
  console.log(processImg)

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
      const url = `http://localhost/farmerUser/testProduce/${userInfo._id}`;
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
              const message = 'You added a new Produce to your Produce Collection'
              const result =  null;
              socket.emit('notification',{userInfo,result,message})
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

  const prevBtn = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + selectedImages.length) % selectedImages.length);
  };

  const nextBtn = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % selectedImages.length);
  };
  return (
    <>
    <p>{err}</p>
    <section className='category-option'>
    <h3>Add a category</h3>
    <aside>
        {selectedCategories.map((category,index) => (
          <p key={index} onClick={() => removeCategory(category)} >{category} <span><i className='fa-solid fa-xmark fa-beat-fade' style={{
            color: 'black'
          }}></i></span>
          </p>
        ))}
      </aside>
    </section>
    <section className='produce-category'>
      <main>
      <h3>Crop Category</h3>
        <div>
        {Object.keys(cropCategory).map((selectCategory,index) => (
          <li key={index} onClick={() => addCategories(selectCategory)}>{selectCategory}<span><i class="fa-solid fa-plus fa-beat"></i></span></li>
        ))}
        </div>
      </main>
      <main>
      <h3>LiveStock Catergory</h3>
      <div>
          {Object.keys(livestockCategory).map((selectCategory,index) => (
          <li key={index} onClick={() => addCategories(selectCategory)}>{selectCategory}<span><i class="fa-solid fa-plus fa-beat"></i></span></li>
        ))}
        </div>
      </main>
    </section>



    <section>
    {selectedImages.length === 0 ? (
    <p className='image-not-select'>No images selected</p>
  ) : (
    <div className='image-container'>
       <div className='carousel-wrapper'> 
       {selectedImages.length > 1 && (
        <i class="fa-solid fa-less-than nav-btn" onClick={prevBtn}></i>
       )}
       <figure className="carousel-image">
       <img
         src={URL.createObjectURL(selectedImages[currentIndex])}
         alt={`Image ${currentIndex + 1}`}
       />
     </figure>
     {selectedImages.length > 1 && (
      <i class="fa-solid fa-greater-than nav-btn" onClick={nextBtn}></i>
     )}
       </div>
    </div>
  )}
    </section>
    <form action="" onSubmit={uploadProduce} className='add-produce-data'>
      <aside>
            <input type="file" multiple onChange={getProduceImage}/>
      </aside>
      <main>
        <article className='input-options'>
          <div>
              <input type="text" name='title' placeholder='Title' onChange={addProduceInfo} value={produce.title}/>
              <label htmlFor="title">Title</label>
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
        </article>
           
            <div>
              <textarea name="description" id="" placeholder='Description' value={produce.description} cols="30" rows="10" onChange={addProduceInfo}></textarea>
              <label htmlFor="description">Description</label>
            </div>
      </main>
      <button className='add-produce'>Add Produce</button>
    </form>
    </>
  )
}

export default FarmerAddProduce
