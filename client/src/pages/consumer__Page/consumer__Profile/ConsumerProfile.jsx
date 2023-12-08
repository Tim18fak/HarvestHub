import React, { useContext, useState } from 'react'
import { Socket, UserContext, UserData } from '../../../../hooks/useContext/ConsumerInfo'
import { Axios } from '../../../../configs/default__configs/axios.config'



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
    <div>
      <form onSubmit={submitUpdated}>
      <h2>Your Profile</h2>
        <div>
          <img src={consumerDataUpdata.profileImage ? consumerDataUpdata.profileImage : userData.profileImage} alt="" />
          <input type="file" onChange={captureUpdatedPImage} />
        </div>
          <h3>Personal Information</h3>
        <div>
          <input type="text" name='username'  value={consumerDataUpdata.username ? consumerDataUpdata.username : userData.username} onChange={getUpdatedBio}/>
          <label htmlFor="username">Username</label>
        </div>
        <div>
          <input type="text"  name='fullname' onChange={getUpdatedBio} value={consumerDataUpdata.fullname ? consumerDataUpdata.fullname : userData.fullname}/>
          <label htmlFor="fullname">Fullname</label>
        </div>
        <div>
          <input type="text" name='address' onChange={getUpdatedBio} value={consumerDataUpdata.address ? consumerDataUpdata.address : userData.address} />
          <label htmlFor="address">Address</label>
        </div>
        <div>
          <input type="text" name='email' onChange={getUpdatedBio} value={consumerDataUpdata.email ? consumerDataUpdata.email : userData.email} />
          <label htmlFor="email">Email</label>
        </div>
        <div>
          <input type="password" name='password' onChange={getUpdatedBio} value={consumerDataUpdata.password ? consumerDataUpdata.password : ''} />
          <label htmlFor="password">Password</label>
        </div>
        <div>
          <input type="number" name='phoneNumber' onChange={getUpdatedBio} value={consumerDataUpdata.phoneNumber ? consumerDataUpdata.phoneNumber : userData.phoneNumber}/>
          <label htmlFor="phoneNumber">PhoneNumber</label>
        </div>
        <div>
          <textarea name="aboutYourself" id="" cols="30" rows="10"  onChange={getUpdatedBio} value={consumerDataUpdata.aboutYourself ? consumerDataUpdata.aboutYourself : userData.aboutYourself} ></textarea>
          <label htmlFor="phoneNumber">AboutYourself</label>
        </div>
        <button>Update Bio</button>
      </form>
    </div>
  )
}

export default ConsumerProfile
