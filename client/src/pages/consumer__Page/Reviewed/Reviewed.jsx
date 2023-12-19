import React, { useEffect } from 'react'
import ImageSlider from '../../../components/default__Component/ImageSlider/ImageSlider'
import './reviewed.css'
const Reviewed = ({review}) => {
  console.log(review)
  return (
    <section className='review-container'>
      {review && review.length > 0 && review.map((val,index) => (
        <div key={index} className='review-cards'>
          <div style={{
                    width: '100%',
                    height: '250px'
                }}>
                <ImageSlider images={val.produceImage}/>
                </div>
          <h2><span>Produce Name:</span>{val.produceTitle}</h2>
          <p><h4>Produce Description:</h4>{val.produceDescription}</p>
          <p><h3>Seller Name:</h3>{val.produceSellerUsername}</p>
          <p><strong>Your Review:</strong> {val.review}</p>
          <button>Delete Review</button>
        </div>
      ))}
    </section>
  )
}

export default Reviewed
