import React, { useState } from 'react';
import './Carousel.css'; // Import your CSS file for styling

const Carousel = ({ selectedImages }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevBtn = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + selectedImages.length) % selectedImages.length);
  };

  const nextBtn = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % selectedImages.length);
  };

  return (
    <div className='image-container'>
      <button className="nav-btn" onClick={prevBtn}>Previous</button>
      <div className="carousel-wrapper">
        {selectedImages && selectedImages.length > 0 && (
          <figure className="carousel-image">
            <img
              src={URL.createObjectURL(selectedImages[currentIndex])}
              alt={`Image ${currentIndex + 1}`}
            />
          </figure>
        )}
      </div>
      <button className="nav-btn" onClick={nextBtn}>Next</button>
    </div>
  );
};

export default Carousel;
