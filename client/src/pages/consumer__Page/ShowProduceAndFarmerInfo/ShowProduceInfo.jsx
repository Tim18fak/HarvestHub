import React, { useContext, useEffect, useState } from 'react'
import SpinnerLoader from '../../../anim/Loaders/SpinnerLoader'
import { Bookmark } from '../../../../configs/consumer__configs/configs'
import { Link } from 'react-router-dom'
import { UserContext, Socket } from '../../../../hooks/useContext/ConsumerInfo'
import Review from '../ReviewProduce/Review'
import './index.css'
import ImageSlider from '../../../components/default__Component/ImageSlider/ImageSlider'
const ShowProduceInfo = ({data,trigger}) => {
    const [fetchData,setFetchData] = useState([])
    const [phoneNum,setPhoneNum] = useState('Call Farmer')
    const [triggerAnimation,setTriggerAnimation] = useState(false)
    const [farmerExist,setFarmerExist] = useState(true)
    const [imageIndex,setImageIndex] = useState(0)
    const [review,setReview] =  useState(false)
    const socket =  useContext(Socket)
    const userInfo =  useContext(UserContext)
    useEffect(() => {
        if(!data.message){
            setFetchData(data)
            setTimeout(() => {
                setTriggerAnimation(true)
            },4000)
            console.log(socket)
        }else{
            setTimeout(() => {
                setTriggerAnimation(true)
            },4000)
            setFarmerExist(false)
        }
    },[data])
    /* call farmer logi */
    const callFarmer = (num) => {
        setPhoneNum(num)
    }
    /* hide farmer number */
    const hideFarmerNum = () => {
        setPhoneNum('Call Farmer')
    }
    /* change image */
    const changeImage = (index) => {
        const image = document.querySelector('#Jumbostron_image');
    
        // Apply a fade-out and translateX effect
        image.style.opacity = '0';
        image.style.transform = 'translateX(-20px)'; // Adjust the value as needed
        image.style.transition = 'opacity 0.5s, transform 0.5s';
    
        // After the fade-out and translateX effect, change the image source and reset the styles
        setTimeout(() => {
            image.src = fetchData.Image[index];
            image.style.opacity = '0';
            image.style.transform = 'translateX(30px)';
        }, 400);

        setTimeout(() => {
            image.style.opacity = '1';
            image.style.transform = 'translateX(0px)';
        }, 1000);
    };
    /* Add Bookmark Logic */
    const bookMark = async(id) => {
        try {
            const result = await Bookmark(id);
            const message =  `you bookmarked a produce with this id ${result}`
            socket.emit('notification',{userInfo,result,message})

        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while bookmarking.');
        }
    }
    const reviewProduce = () => {
        setTriggerAnimation(false)
        setTimeout(() => {
            setTriggerAnimation(true)
            setReview(true)
        },2000)
        
    }
    const showProduceInfo = () => {
        setTriggerAnimation(false)
        setTimeout(() => {
            setTriggerAnimation(true)
            setReview(false)
        },2000)
       
    }
    /* Animation Preloader */
    if(triggerAnimation === false) return <SpinnerLoader/>
  return (
    <>
    {!review && (
        <>
         <a onClick={trigger}><i class="fa-solid fa-arrow-left fa-beat" id='fa-arraow-left' style={{
            color: 'white'
        }}>Back</i></a>
        <section className='farmer-info_plus-produce'>
        {/* produce info */}
        {farmerExist && (
            <>
            <main className='produce-data'>
            <figure >
                {fetchData.Image && fetchData.Image.length > 0 && (
                    <>
                    <figure>
                    <img src={fetchData.Image[imageIndex]} alt="Produce Image"  id='Jumbostron_image'/>
                    </figure>
                    </>
                )}
                <aside className='sub-images'>
                {fetchData.Image && fetchData.Image.length > 1 && fetchData.Image.map((image, index) => (
                            <img src={image} key={index} alt="image" width={80} height={80} onClick={() => changeImage(index)}  />
                        ))}
                </aside>
            </figure>
            <div className='produce-title'>
            <h3>{fetchData.title}</h3>
            <h4>#{fetchData.price}</h4>
            </div>
            <p produce='data'>{fetchData.description}</p>
            <ul className='produce_other-options'>
                <li produce='data'>{fetchData.quantity}</li>
                <li produce='data'><i class="fa-solid fa-location-dot"></i>{fetchData.location}</li>
                <li produce='data'>{fetchData.quantity}</li>
            </ul>
            <li produce='data'>{new Date(fetchData.date).toLocaleDateString('en-US', { weekday: 'long',
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',})}
                </li>
            <div className='produce_button'>
            <button onClick={() => bookMark(fetchData._id)}>Bookmark</button>
            <button onClick={() => reviewProduce(fetchData)}>Review Produce</button>
            </div>
        </main>

        {/* farmer info */}
        <aside className='farmer-info'>
            <main>
            <article>
            <h3>Farmer Information</h3>
            <h2>Username: {fetchData.username}</h2>
            <ul>
                <li><span>Verification Status</span>: {fetchData.verificationStatus}</li>
            </ul>
            <h4>Farmer's Farm Information</h4>
            <ul>
                <li><span>Farm Type: </span>{fetchData.farmType}</li>
            </ul>
            </article>
            <figure>
                <img src={fetchData.profileImage} alt="" />
            </figure>
            </main>
        </aside>
        </>
        )}
        {!farmerExist && (
            <aside className='farmer-banned'>
                <p>Farmer Info was not found on our database</p>
                <p>Possible reasons</p>
                <ul>
                    <li>Farmer has been deleted or banned by our Admin</li>
                    <li>Farmer has deleted his/her account from our database</li>
                </ul>
            </aside>
        )}
        
    </section>
    </>
    )}



    {/* other farmer produce */}
    {!review && (
       <section>
        <h4 className='other-produce-h2'><span>Other Produce</span></h4>
       <aside className='other-produce'>
                   {fetchData.otherProduce && fetchData.otherProduce.length > 0 && (
                       <>
                       <main >
                           {fetchData.otherProduce.map((otherProduce,index) => (
                               <div key={index}>
                                    <section>
                                    <div className='image-slider'>
                                <ImageSlider images={otherProduce.Image}/>
                                </div>
                                   
                                    </section>
                               </div>
                           ))}
                       </main>
                       </>
                   )}
               </aside>
       </section>
    )}
    {review && (
        <Review back={showProduceInfo} produce={fetchData}/>
    )}
    </>
  )
}

export default ShowProduceInfo