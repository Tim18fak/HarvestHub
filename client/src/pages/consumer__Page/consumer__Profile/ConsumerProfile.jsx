import React, { useContext, useState } from 'react'
import { Socket, UserContext, UserData } from '../../../../hooks/useContext/ConsumerInfo'
import { Axios } from '../../../../configs/default__configs/axios.config'
import './profile.css'
import { Dashboard } from '../../../../data/consumer/data'

const updateValue = {
/* Personal Information */
username: '',
fullname:'',
address: '',
email: '',
NIN: '',
phoneNumber: '',
aboutYourself: '',
password:'',
profileImage: '',

/* Other Information */
comeAbout: '',
}
const ConsumerProfile = () => {
  const [consumerDataUpdata,setConsumerDataUpdata] = useState(updateValue)
  const userData = useContext(UserData)
  const socket = useContext(Socket)
  const userInfo =  useContext(UserContext)

  const getUpdatedBio = (e) => {
    const {name,value} = e.target
    setConsumerDataUpdata({...consumerDataUpdata,[name] : value})
  }
  /* submit updated bio */
  const submitUpdated = async(e) => {
    e.preventDefault()
    try {
      const url = `http://localhost/auth/uP/${userData._id}/${userData.isFarmer}`
      const {username,
        fullname,
        address,
        email,
        NIN,
        phoneNumber,
        aboutYourself,
        password,
        comeAbout,profileImage} = consumerDataUpdata

      const result  = await Axios.put(url,{
        username,
        fullname,
        address,
        email,
        NIN,
        phoneNumber,
        aboutYourself,
        password,
        profileImage,

/* Other Information */
        comeAbout
      },{
        headers: {
          Authorization: `Bearer ${userData.accessToken}`
        }
      })
      if(result.status === 200){
        console.log(result.status)
        window.location.reload()
        setTimeout(() => {
          const message = 'You updated your Profile'
              const result =  null;
              socket.emit('notification',{userInfo,result,message})
        },7000)
      }
    } catch (error) {
      
    }
  }
  const captureUpdatedPImage = (e) => {
    const { files } = e.target;
    const profileImage = new FileReader()
    profileImage.onload = (e) => {
      setConsumerDataUpdata({...consumerDataUpdata,profileImage: e.target.result})
    }
    profileImage.readAsDataURL(files[0])
  }
  console.log(consumerDataUpdata)
  return (
    <>
    <section className='profile-jumbostron' style={{
      backgroundImage: `linear-gradient(195deg, rgba(16, 236, 34, 0.6), rgba(239, 243, 13, 0.6)),url(${Dashboard.profileImage})`
    }}>
    </section>
    <form className='consumer-data'>
      <div className='consumer-data-profileimage'>
        <img src={consumerDataUpdata.profileImage ? consumerDataUpdata.profileImage : userData.profileImage} alt="" width={80} height={80} />
        <aside>
          <h2>{userData.fullname}</h2>
          <p>Role: <span>Consumer</span></p>
          <input type="file" onChange={captureUpdatedPImage} />
        </aside>
      </div>
      <div className='consumer-data-basic-info'>
        <h4>Basic Info</h4>
        <main className='data-user-info'>
        <div>
        <label htmlFor="username">Username</label>
          <input type="text" name='username'  value={consumerDataUpdata.username ? consumerDataUpdata.username : userData.username} onChange={getUpdatedBio}/>
        </div>
        <div>
          <label htmlFor="fullname">Fullname</label>
          <input type="text"  name='fullname' onChange={getUpdatedBio} value={consumerDataUpdata.fullname ? consumerDataUpdata.fullname : userData.fullname}/>
        </div>
        <div>
        <label htmlFor="address">Address</label>
          <input type="text" name='address' onChange={getUpdatedBio} value={consumerDataUpdata.address ? consumerDataUpdata.address : userData.address} />
        </div>
        <div>
        <label htmlFor="email">Email</label>
          <input type="text" name='email' onChange={getUpdatedBio} value={consumerDataUpdata.email ? consumerDataUpdata.email : userData.email} />
        </div>
        <div>
        <label htmlFor="password">Password</label>
          <input type="password" name='password' onChange={getUpdatedBio} value={consumerDataUpdata.password ? consumerDataUpdata.password : ''} />
        </div>
        <div>
        <label htmlFor="phoneNumber">PhoneNumber</label>
          <input type="number" name='phoneNumber' onChange={getUpdatedBio} value={consumerDataUpdata.phoneNumber ? consumerDataUpdata.phoneNumber : userData.phoneNumber}/>
        </div>
        <div>
        <label htmlFor="phoneNumber">AboutYourself</label>
          <textarea name="aboutYourself" id="" cols="30" rows="10"  onChange={getUpdatedBio} value={consumerDataUpdata.aboutYourself ? consumerDataUpdata.aboutYourself : userData.aboutYourself} ></textarea>
        </div>
        </main>
        <a className='submit' onClick={submitUpdated} >Update Bio</a>
      </div>
    </form>
    </>
  )
}

export default ConsumerProfile
