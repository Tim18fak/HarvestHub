import React, { useContext, useState } from 'react'
import { Socket, UserData } from '../../../../hooks/useContext/ConsumerInfo'
import { ReviewProduce } from '../../../../configs/consumer__configs/configs'
import ImageSlider from '../../../components/default__Component/ImageSlider/ImageSlider'
const Review = ({produce,back}) => {
    const [review,setReview] =  useState('')
    const socket =  useContext(Socket)
    const userInfo =  useContext(UserData)

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
  return (
    <>
    <p onClick={back}><i class="fa-solid fa-arrow-left fa-beat">Back</i></p>
    <section >
        <h2>Lets Review this produce of Id {produce._id}</h2>
        <figure>
        <div style={{
                    width: '100%',
                    height: '250px'
                }}>
                <ImageSlider images={produce.Image}/>
                </div>
            {produce && produce.Image && produce.Image.length > 0 && produce.Image.map((image,index) => (
                <img src={image} alt=""  key={index}/>
            ))}
            <h2><span>Produce Name </span> {produce.title}</h2>
            <p><span>Produce Description <span>{produce.description}</span></span></p>
            <h3><span>Produce Farmer name </span> {produce.fullname}</h3>
        </figure>
    </section>
    <form  onSubmit={(e) => submitReview(produce,userInfo,e)}>
      <h3>Review the produce</h3>
      <div>
        <textarea name='review' id="" cols="30" rows="10" onChange={getReview}></textarea>
        <label htmlFor="review">What would you like the farmer to know about his/her services</label>
      </div>
      <button >Submit review</button>
    </form>
    </>
  )
}

export default Review
