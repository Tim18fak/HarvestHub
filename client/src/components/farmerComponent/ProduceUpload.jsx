import React, { useState, useContext } from "react";
import FarmerInfo from "./constants/FarmerContextProvider";


const productDetails = {
    description: "",
    quantity: "",
    price: "",
    category:"",
    location: "",
    date: ""
  };

const ProduceUpload = () => {
    const  [imgNum,setImgNum] = useState(0)
  const [selectedFile, setSelectedFile] = useState(null);
  const [productData, setProductData] = useState(productDetails);
  /// getting the userid useing useContext()
  const {userid} = useContext(FarmerInfo)

  const [userId , setUserId] = useState('')


  
  const handleFileChange = (e) => {
    e.preventDefault();
    setSelectedFile(e.target.files);
  };

  const ImgAdd = () => {
    const ImgSize = selectedFile.length  - 1
    console.log(ImgSize)
    if(imgNum < ImgSize){
      setImgNum((preimg) => imgNum + 1)
    }
    
  }

  const ImgSubstract = () => {
    const ImgSize = selectedFile.length
    if(ImgSize > 0){
    if(imgNum > 0){
      setImgNum((preimg) => imgNum - 1)
    }
  }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  }

console.log(productData)

  const handleImageUpload = async (e) => {
    e.preventDefault();
    
    setUserId(userid)
    if (!selectedFile) {
      alert("Please select an image to upload.");
      return;
    }

    const formData = new FormData();

    for (let i = 0; i < selectedFile.length; i++) {
      formData.append("image", selectedFile[i]);
    }

    // Add other product data to the form data
    formData.append("description", productData.description);
    formData.append("quantity", productData.quantity);
    formData.append("price", productData.price);
    formData.append("category", productData.category);
    formData.append("location",productData.location);
    formData.append("date",productData.date)

    console.log(formData.getAll("image"));

    const url = `https://harvest-hub-pi.vercel.app/farmerUser/createProduct?userid=${userid}`;

    try {
      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Image and data uploaded successfully!");
        setSelectedFile(null);
        setProductData(productDetails); // Reset the product data
      } else {
        alert("Image upload failed.");
        console.log("Response Status:", response.status);
        console.log("Response Status Text:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div>
        <h2>Please only pick 5 images</h2>
        <form onSubmit={handleImageUpload}>
          <aside>
            <input
              value={selectedFile ? selectedFile.name : ""}
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              name="image"
            />
            {selectedFile && (
              <figcaption>
                <span onClick={ImgSubstract}>-</span>
                <img src={URL.createObjectURL(selectedFile[imgNum])} width={500} height={500}/>
                <span onClick={ImgAdd}>+</span>
              </figcaption>
            )}
          </aside>
          <main>
            <div>
                 <h3>Categories</h3>
            <label>
              <input
                type="radio"
                name="category"
                value="Protein"
                onChange={handleInputChange}
                checked={productData.category === "Protein"}
              />
              Protein
            </label>
            <label>
              <input
                type="radio"
                name="category"
                value="Vegetables"
                onChange={handleInputChange}
                checked={productData.category === "Vegetables"}
              />
              Vegetables
            </label>
            <label>
              <input
                type="radio"
                name="category"
                value="Fruits"
                onChange={handleInputChange}
                checked={productData.category === "Fruits"}
              />
              Fruits
            </label>
            <label>
              <input
                type="radio"
                name="category"
                value="Other"
                onChange={handleInputChange}
                checked={productData.category === "Other"}
              />
              Other
            </label>
            </div>
            <div>
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              value={productData.description}
              cols="30"
              rows="10"
              onChange={handleInputChange}
            />
            </div>
            <div>
            <input
              type="number"
              name="quantity"
              value={productData.quantity}
              onChange={handleInputChange}
            />
            <label htmlFor="quantity">Quantitiy</label>
            </div>
           <div>
           <input
              type="number"
              name="price"
              value={productData.price}
              onChange={handleInputChange}
            />
            <label htmlFor="price">Price</label>
           </div>
          </main>
          <main>
            <div>
              <input type="date" name="date" id="" onChange={handleInputChange} value={productData.date}/>
              <label htmlFor="date">Date</label>
            </div>
            <div>
              <input type="text" name="location" id="" value={productData.location} onChange={handleInputChange}/>
              <label htmlFor="location">Location</label>
            </div>
          </main>
          <button type="submit">Upload Image</button>
        </form>
      </div>
      </>
  )
}

export default ProduceUpload
