import React, { useState } from 'react'
import './carousel.css'
const Carousel = ({produce}) => {
    const [currentIndex,setCurrentIndex] = useState(0)
    const prevBtn = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + produce.Image.length) % produce.Image.length);
      };
    
      const nextBtn = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) %  produce.Image.length);
      };
  return (
    <div className='image-container'>
    <div className='carousel-wrapper'> 
    {produce.Image.length > 1 && (
     <i class="fa-solid fa-less-than nav-btn1" onClick={prevBtn}></i>
    )}
    <figure className="carousel-image">
    <img
      src={produce.Image[currentIndex]}
      alt={`Image ${currentIndex + 1}`}
    />
  </figure>
  {produce.Image.length > 1 && (
   <i class="fa-solid fa-greater-than nav-btn2" onClick={nextBtn}></i>
  )}
    </div>
 </div>
  )
}

export default Carousel
