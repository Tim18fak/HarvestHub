import React, { useEffect } from 'react'

const Reviewed = ({review}) => {
  console.log(review)
  return (
    <section>
      {review && review.length > 0 && review.map((val,index) => (
        <div key={index}>
         <figure>
          {val.produceImage && val.produceImage.length > 0 && val.produceImage.map((image,index) => (
            <img src={image} alt="" key={index} />
          ))}
         </figure>
          <h2><span>Produce Name: </span>{val.produceTitle}</h2>
          <p><h4>Produce Descriotion:</h4>{val.produceDescription}</p>
          <p><h3>Seller Name:</h3>{val.produceSellerUsername}</p>
          <p><strong>Your Review:</strong> {val.review}</p>
          <button>Delete Review</button>
        </div>
      ))}
    </section>
  )
}

export default Reviewed
