import React from 'react'
import './alertBox.css'
const alertBox = ({message,onOpen}) => {
  return (
   <>
   {onOpen && (
    <div className='alert_box-main'>
        <h2>HarvestHub</h2>
        <p>{message}</p>
    </div>
   )}
   </>
  )
}

export default alertBox
