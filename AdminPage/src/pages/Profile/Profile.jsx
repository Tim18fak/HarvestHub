import React, { useContext, useEffect, useState } from 'react'
import Loader from '../../components/anims/loader/Loader'
import Progress from '../../components/anims/progressbar/Progress'
import { admin } from '../../../data/adminData'
import { adminInfo } from '../../../hooks/usecontext/useContext'
import './profile.css'
import { data } from '../../../data/adminData'
const updateAmdinProfile ={
  profileImage: '',
  fulllname: '',
  email: '',
  password: ''
}

const Profile = ({profile}) => {
  const [adminProfile,setAdminProfile] =  useState(updateAmdinProfile)
  const [triggerAnim,setTriggerAnim] = useState(true)
  const [subProfileUpdateAnim,setSubProfileUpdateAnim]  = useState(false)
  const [subProfileUpdatedAnim,setProfileUpdatedAnim] = useState(false)
  const userData = useContext(adminInfo)
  const initalProfile = profile.profileImage ? profile.profileImage : admin.initialProfileImag
  useEffect(() => {
    if(profile){
      setAdminProfile(profile)
    }
    setTimeout(() => {
      setTriggerAnim(false)
    },3000)
    console.log(profile)
  },[profile])

  const getAdminInfo  =(e) => {
    const {name,value} = e.target;
    setAdminProfile({...adminProfile,[name]: value})
    console.log(adminProfile)
  }
  const getAdminProfileImage = (e) => {
    const { files } = e.target;
    const adminImage =  new FileReader()
    adminImage.onload =(e) => {
      console.log(e.target.result)
      setAdminProfile({...adminProfile,profileImage: e.target.result})
    }
    adminImage.readAsDataURL(files[0])
    console.log(adminProfile)
  }

  /* update admin profile */
  const updateProfile = async(e) => {
    e.preventDefault()
    try {
      const url = `http://localhost/admin/update/${userData.token}`
      const update =  await admin.Axios.put(url,{
        adminProfile
      },{
        headers: {
          Authorization: `Bearer ${userData.id}`
        }
      })
      console.log(update)
      if(update.status === 200){
        setSubAnim(true);
        setTimeout(() => {

        },2000)
      }
    }
  catch(err){

  }}
   

  if(triggerAnim) return <Loader/>
  return (
    <>
    {subProfileUpdateAnim && (
      <Progress/>
    )}
    <section className='profile-jumbostron' style={{
      backgroundImage: `linear-gradient(195deg, rgba(16, 236, 34, 0.6), rgba(239, 243, 13, 0.6)),url(${data.profileBackgroundImage})`
    }} >

    </section>
    <form onSubmit={updateProfile} className='profile-form'>
      <section className='profile-image-section' style={{
      backgroundImage: `linear-gradient(195deg, rgba(16, 236, 34, 0.6), rgba(239, 243, 13, 0.6))`
    }}>
      <figure>
      <img src={adminProfile.profileImage ? adminProfile.profileImage : initalProfile} alt="" width={100} height={100} />
      <input type="file"  onChange={getAdminProfileImage}/>
    </figure>
    <div>
        <h3>{profile.username}</h3>
        <h4>Role: <span>Admin</span></h4>
        <p>Id: <span>{profile.adminId}</span></p>
      </div>
      </section>

      <section className='profile-input'>
      <div>
      <input type="text" name='fulllname'  onChange={(e) => getAdminInfo(e)} />
      <label htmlFor="fullname">Fullname</label>
    </div>
    <div>
      <input type="text" name='email'  onChange={(e) => getAdminInfo(e)} />
      <label htmlFor="email">email</label>
    </div>
    <div>
      <input type="password" name='password' onChange={(e) => getAdminInfo(e)} />
      <label htmlFor="password">password</label>
    </div>
    <button>Update</button>
      </section>
   
    </form>
    
    </>
  )
}

export default Profile