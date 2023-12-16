import React, { useState } from 'react'
import './slider.css'
const ImageSlider = ({images}) => {
    const [currentIndex,setIndex] = useState(0)

    const prevBtn = () => {
        const lastindex = currentIndex === 0
        const updatedIndex = lastindex ? images.length - 1 : currentIndex  - 1
        console.log(updatedIndex)
        setIndex(updatedIndex)
    }
    const nextBtn = () => {
        const lastIndex = currentIndex === images.length - 1;
        const updatedIndex = lastIndex ? 0 : currentIndex + 1;
        console.log(`currentIndex: ${currentIndex}, lastIndex: ${lastIndex}, updatedIndex: ${updatedIndex}`);
        setIndex(updatedIndex);
      };
      
console.log(images)
  return (
    <>
    <div className='carousel-constainer'> 
        <div style={{
            backgroundImage: `url(${images[currentIndex]})`
        }}>
   {images.length > 1 &&(
    <>
     <button onClick={prevBtn} className='prevBtn'>&lt;</button>
     <button onClick={nextBtn} className='nextBtn'>&gt;</button>
     </>
   )}
    <ul>
        {images && images.map((image,index) => {
            
        })}
        </ul>
        </div>
    </div>
    </>
  )
}

export default ImageSlider
