import React, { useEffect } from 'react'

const Reviewed = ({review}) => {
  console.log(review[0].remark)
  return (
    <section>
      {review && review.length > 0 && review.map((val,index) => (
        <div key={index}>
         
          <h2>{val.produceTitle}</h2>
        </div>
      ))}
    </section>
  )
}

export default Reviewed
