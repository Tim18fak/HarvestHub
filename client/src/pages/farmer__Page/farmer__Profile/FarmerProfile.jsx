import React, {useState,useContext} from 'react'
import { Socket, UserData,UserContext } from '../../../../hooks/useContext/ConsumerInfo'
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

const FarmerProfile = () => {
  const [farmerDataUpdate,setFarmerDataUpdate] = useState(updateValue)
  const userData = useContext(UserData)
  const socket = useContext(Socket)
  const userInfo =  useContext(UserContext)

  const getUpdatedBio = (e) => {
    const {name,value} = e.target
    setFarmerDataUpdate({...farmerDataUpdate,[name] : value})
  }

  /* submit updated bio */
  const submitUpdated = async(e) => {
    e.preventDefault()
    console.log('update')
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
        comeAbout,profileImage} = farmerDataUpdate

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
      setFarmerDataUpdate({...farmerDataUpdate,profileImage: e.target.result})
    }
    profileImage.readAsDataURL(files[0])
  }

  return (
    <div>
      <form onSubmit={submitUpdated}>
      <h2>Your Profile</h2>
        <div>
          <img src={farmerDataUpdate.profileImage ? farmerDataUpdate.profileImage : userData.profileImage} alt="" />
          <input type="file" onChange={captureUpdatedPImage} />
        </div>
          <h3>Personal Information</h3>
        <div>
          <input type="text" name='username'  value={farmerDataUpdate.username ? farmerDataUpdate.username : userData.username} onChange={getUpdatedBio}/>
          <label htmlFor="username">Username</label>
        </div>
        <div>
          <input type="text"  name='fullname' onChange={getUpdatedBio} value={farmerDataUpdate.fullname ? farmerDataUpdate.fullname : userData.fullname}/>
          <label htmlFor="fullname">Fullname</label>
        </div>
        <div>
          <input type="text" name='address' onChange={getUpdatedBio} value={farmerDataUpdate.address ? farmerDataUpdate.address : userData.address} />
          <label htmlFor="address">Address</label>
        </div>
        <div>
          <input type="text" name='email' onChange={getUpdatedBio} value={farmerDataUpdate.email ? farmerDataUpdate.email : userData.email} />
          <label htmlFor="email">Email</label>
        </div>
        <div>
          <input type="password" name='password' onChange={getUpdatedBio} value={farmerDataUpdate.password ? farmerDataUpdate.password : ''} />
          <label htmlFor="password">Password</label>
        </div>
        <div>
          <input type="number" name='phoneNumber' onChange={getUpdatedBio} value={farmerDataUpdate.phoneNumber ? farmerDataUpdate.phoneNumber : userData.phoneNumber}/>
          <label htmlFor="phoneNumber">PhoneNumber</label>
        </div>
        <div>
          <textarea name="aboutYourself" id="" cols="30" rows="10"  onChange={getUpdatedBio} value={farmerDataUpdate.aboutYourself ? farmerDataUpdate.aboutYourself : userData.aboutYourself} ></textarea>
          <label htmlFor="phoneNumber">AboutYourself</label>
        </div>
        <aside>
          <h3>Farming Information</h3>
          <div>
          <input type="text" name='farmType' onChange={getUpdatedBio} value={userData.farmType} />
          <label htmlFor="farmType">Farm Type</label>
        </div>
        <div>
          <input type="text" name='farm_Address' onChange={getUpdatedBio} value={ 
            userData.farm_Address} />
          <label htmlFor="farm_Address">Farm Address</label>
        </div>
        <div>
          <input type="number" name='farmingExperience' onChange={getUpdatedBio} value={userData.farmingExperience} />
          <label htmlFor="farmingExperience">Farming Experience</label>
        </div>
        
        </aside>
        <button>Update Bio</button>
      </form>
    </div>
  )
}

export default FarmerProfile