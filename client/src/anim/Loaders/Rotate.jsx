import React from 'react'
import './rotate.css'
const Rotate = () => {
    const word = 'HarvestHub';
    const HHUB = word.split('');
    return (
      <>
      <div className='rotate-container'>
        <p className='rotate'>
        {HHUB.map((val,index) => (
          <span style={{ '--j': index + 1 }} key={index}>{val}</span>
      ))}
        </p>
      </div>
      </>

    )
}
export default Rotate
