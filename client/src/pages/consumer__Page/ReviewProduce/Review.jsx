import React, { useContext, useState } from 'react'
import { Socket, UserData } from '../../../../hooks/useContext/ConsumerInfo'
import { ReviewProduce } from '../../../../configs/consumer__configs/configs'
import ImageSlider from '../../../components/default__Component/ImageSlider/ImageSlider'
import './review.css'
import ScaleAnim from '../../../anim/Loaders/ScaleAnim'
const Review = ({produce,back}) => {
    const [review,setReview] =  useState('')
    const [currentIndex,setCurrentIndex] = useState(0)
    const socket =  useContext(Socket)
    const userInfo =  useContext(UserData)
  const [reviewInProgres,setProgress] = useState('addreview')
    const submitReview = async(produce,userData,e) => {
      e.preventDefault()
        try {
          const reviewed = await ReviewProduce(produce,userData,review)
          const {status,message} =  reviewed
        if(status){
           /*  const message = `you just reviewed a produce with this id ${produce._id}` */
            socket.emit('notification',{})
        }
        
        } catch (error) {
          
        }
    }
    const getReview = (e) => {
      setReview(e.target.value)
    }


    /* carousel trigger and control */

    const prevBtn = () => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + produce.Image.length) % produce.Image.length);
    };
  
    const nextBtn = () => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) %  produce.Image.length);
    };
  return (
    <>
    <p back='back' onClick={back}><i class="fa-solid fa-arrow-left fa-beat">Back</i></p>
    {reviewInProgres === 'addreview' && (
      <>
      <section className='review-produce' id='blur-container'>
        <h2 >Lets Review this produce of Id {produce._id}</h2>
        
          <aside className='produce-farmer-basic-info'> 
          <h2><span>Produce Name </span> {produce.title}</h2>
            <p><span>Produce Description: <span>{produce.description}</span></span></p>
            <h3><span>Produce Farmer name: </span> {produce.fullname}</h3>
          </aside>
        {/* review */}
        <form  onSubmit={(e) => submitReview(produce,userInfo,e)}>
      <h3>Review the produce</h3>
      <div className='your-review'>
        <textarea name='review' id="" cols="30" rows="10" onChange={getReview}></textarea>
        <label htmlFor="review">What would you like the farmer to know about his/her services</label>
      </div>
      <button  className='review-button'>Submit review</button>
    </form>
    </section>
      </>
    )}
    {reviewInProgres === 'addingreview' && (
      <ScaleAnim/>
    )}
    {reviewInProgres === 'reviewadded' && (
      <section>
        <h2>Thanks for your review</h2>
        <p>Your review has been sent</p>
      </section>
    )}
    </>
  )
}

export default Review
