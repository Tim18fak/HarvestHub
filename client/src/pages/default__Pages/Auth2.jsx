import React, { useEffect, useState } from 'react'
import { cookie } from '../../../configs/default__configs/cookies'
import ActivationCode from './ActivationCode'
import { Link } from 'react-router-dom'
import './styles/Auth2.css'
import { data } from '../../../data/farmer/data'
const signInInfo = {
  fullname:'',
  username:'',
  email:'',
  password: '',
  confirm__password: '',
}
const loginInfo = {
  username: '',
  email: '',
  password: '',
}

const FarmerInfo = {
    /* farmer main information */
    address: '',
    nationalId: '',
    phoneNumber: '',
    driverLicence: '',
    farmingExperience: '',
    profileImage: '',
    /* farmer Farm information */
    type: '',
    location: '',
    comeabout: ''

}

const ConsumerInfo = {
    /* consumer Information */
    address: '',
    nationalId: '',
    phoneNumber: '',
    profileImage: '',

    /* Where did you hear us from */
    comeabout: ''

}

const Auth2 = () => {
  const [isLogin,setIsLoginIn] = useState(true)
  const [comparePass,setComparePass] =  useState(true)
  const [userInfo,setUserInfo] = useState(isLogin ? loginInfo : signInInfo)
  const [checkBox,setCheckBox] = useState(false)
  const [usernameTaken,setUserTaken] = useState('')
  const [succesRes,setSuccesRes] = useState('')
  const [err_Res,setErrRes] = useState('')
  const [accountCreated,setAccountCreated] = useState(false)
  const [quenstionaireLength,setQuestionaireLength] = useState(0)
  const [farmerInfo,setFarmerInfo] = useState(FarmerInfo)
  const [consumerInfo,setConsumerInfo] =  useState(ConsumerInfo)
  const [next,setNext] = useState(true)

  /* algorithm to ensure that user's enter the same password */
  useEffect(() => {
    if(checkBox){

    }else{
       if(consumerInfo.address && consumerInfo.nationalId && consumerInfo.phoneNumber && consumerInfo.profileImage){
      setNext(false)
    }else{
      setNext(true)
    }
    }
    console.log(farmerInfo)
    console.log(consumerInfo)
  },[consumerInfo,farmerInfo])
  useEffect(() => {
    if(isLogin === false){
      if(userInfo.password === userInfo.confirm__password && userInfo.email && userInfo.username && userInfo.password && userInfo.confirm__password && userInfo.fullname){
        setComparePass(false)
      }else{
        setComparePass(true)
      }
    }
  },[userInfo])

  useEffect(() => {
    if(userInfo.username && !isLogin){
      const {username} = userInfo
      const value = checkBox ? 'Farmer' : 'Consumer'
      const URL = `http://localhost/auth/fS/${username}/${value}`
      fetch(URL)
      .then((response) => {
        if(!response.ok){
          
        }
        console.log(response)
        switch (response.status) {
          case 200:
            console.log('username not taken')
            setUserTaken(null)
            break;
          case 403:
            setUserTaken('username taken')
            setTimeout(() => {
              setUserTaken('')
            },3000)
            setComparePass(true)
            break;

          default:
            console.log(response.status)
            break;
        }

      })
    }
  },[userInfo.username,checkBox])

  const Auth = (e) => {
    e.preventDefault()
    const url =  isLogin ? "http://localhost/auth/login" : "http://localhost/auth/signup"
    console.log(checkBox)
      const {email,username,password,confirm__password,fullname} = userInfo
    fetch(url,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: isLogin ? JSON.stringify({
        email,
        username,
        password,
        isFarmer:checkBox,
      }) : JSON.stringify({
        email,
        username,
        isFarmer: checkBox,
        password,
        confirm__password,
        fullname,
        extraInfo: checkBox ? farmerInfo : consumerInfo
      })
      })
      .then((response) => {
        if(!response.ok){

        }
        response.json()
        .then((data) => {
          console.log(data)
          if(isLogin && data){
            if(response.status >= 400){
              setErrRes(data.message)
              setTimeout(() => {
                setErrRes('')
              },3000)
            }
          }
          if(isLogin && data._id){
            const {isFarmer,accessToken,username,_id} = data;
            cookie.set('username',username)
            cookie.set('isFarmer',isFarmer)
            cookie.set('_id',_id)
            cookie.set('accessToken',accessToken)
            if(data.isFarmer){
              window.location.replace('/fM/profile')
            }else{
              window.location.replace('/cN/dashboard')
            }
          }
          if(!isLogin && response){
            if(response.status === 200){
              console.log(data)
              setSuccesRes(data)
              setAccountCreated((pre) => !accountCreated)
            }
            if(response.status >= 400){
              setErrRes(data.message)
              setTimeout(() => {
                setErrRes('')
              },3000)
            }
          }
        })
        .catch((err) => {

        })
      })
}
/* Change the form from login to signIn */
const Change__Form = () => {
  setIsLoginIn((prev) => !isLogin)
  console.log(userInfo)
  setUserInfo(isLogin ? loginInfo : signInInfo)
  setAccountCreated(false)
}
/* Gather user info */
const getUserInfo = (e) => {
  const {name,value} = e.target;
  setUserInfo({...userInfo,[name]: value})
}
/* get the profile image */
const getProfileImage = (e) => {
  const { files } = e.target;
  const profileImage = new FileReader()
  profileImage.onload = (e) => {
    const processedBioImage = e.target.result;
    checkBox ?setFarmerInfo({...FarmerInfo,profileImage: processedBioImage}) :setConsumerInfo({...ConsumerInfo,profileImage : processedBioImage})
  }
  profileImage.readAsDataURL(files[0])
}
/* get Info from isFarmer checkbox */
const isFarmerCheckBox = (e) => {
  setCheckBox((prev) => !checkBox)
}
/* get the questionaire logic moving in a forward means */
const questionaireInfo = () => {
    setQuestionaireLength((prev) => quenstionaireLength + 1)
}
const questionaireInfoBack = () => {
  setQuestionaireLength((prev) => quenstionaireLength - 1)
}
const getFarmerExtraInfo = (e) => {
    const {name,value} = e.target;
    setFarmerInfo({...farmerInfo,[name] : value})
}
const getExtraInfo = (e) => {
    const {name,value} = e.target
    checkBox ? setFarmerInfo({...farmerInfo,[name] : value}) :setConsumerInfo({...consumerInfo,[name] : value})
}
  return (
    <>
    <section className='auth-body'>
      <main className='auth-logic'>
      {!accountCreated && quenstionaireLength === 0 &&(
    <>
      <form method="post" onSubmit={Auth} className='auth-form'>
        <h2 className='auth-topic'>{isLogin ? "Login" : "SignIN"}</h2>
      <div>
        <input type="text" name='username' value={userInfo.username} onChange={getUserInfo}/>
        <label htmlFor="username">Username</label>
      </div>
      {!isLogin && (
        <div>
        <input type="text" name='fullname' value={userInfo.fullname} onChange={getUserInfo}/>
        <label htmlFor="fullname">Fullname</label>
      </div>
      )}
      <div>
        <input type="text" name='email' value={userInfo.email} onChange={getUserInfo}/>
        <label htmlFor="email">Email</label>
      </div>
      <div>
        <input type="text" name='password' value={userInfo.password} onChange={getUserInfo}/>
        <label htmlFor="">Password</label>
      </div>
      {!isLogin && (
        <div>
        <input type="text" name='confirm__password' value={userInfo.confirm__password} onChange={getUserInfo}/>
        <label htmlFor="confirm__password">Confirm Password</label>
      </div>
      )}
         <article style={{
          marginTop: '10px'
         }}>
         <input type="checkbox" name='isFarmer' checked={checkBox} onChange={isFarmerCheckBox}/>
         <label htmlFor="isFarmer">Are You A Farmer</label>
       </article>

      {isLogin && (
        <button className='auth-button' disabled={!isLogin && comparePass ? true : false}>{isLogin ? "Login In" : "Sign In"}</button>
      )}
       {!isLogin && quenstionaireLength === 0 &&(
        <button className='auth-button' onClick={questionaireInfo} disabled={comparePass}>Next</button>
      )}
      </form>
    </>
    )}
    {quenstionaireLength === 1 && checkBox &&(
        <form className='auth-question1'>
        
            <h1>Tell us About Yourself</h1>
            <figure>
              <img src={farmerInfo.profileImage ? `${farmerInfo.profileImage}` : 'https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-855.jpg?size=626&ext=jpg&ga=GA1.1.222711603.1699046896&semt=ais'} width={200} height={200} alt="" />
                <input type="file" onChange={getProfileImage}/>
            </figure>
            <div>
              <input type="text" name='address' onChange={getExtraInfo} value={farmerInfo.address} required/>
                <label htmlFor="address">Home Address</label>
            </div>
            <div>
              <input type="text" name='nationalId' onChange={getExtraInfo} value={farmerInfo.nationalId} required/>
                <label htmlFor="nationalId">NIN</label>
            </div>
            <div>
              <input type="number" name='phoneNumber' onChange={getExtraInfo} value={farmerInfo.phoneNumber} required/>
                <label htmlFor="phoneNumber">Phone Number</label>
            </div>
            <div>
              <input type="text" name='driverLicence' onChange={getExtraInfo} value={farmerInfo.driverLicence} />
                <label htmlFor="driverLicence">Driver Licence</label>
            </div>
            <aside className='next-question'>
             <p onClick={questionaireInfoBack}><a href="#">Back</a></p>
             <button onClick={questionaireInfo}>Next</button>
             </aside>
             
        </form>
    )}
    {quenstionaireLength === 2 && checkBox &&(
        <form className='auth-question1'>
          <h2 className='auth-question2'>Tell us more about your farming profession</h2>
            
          <div>
            <input type="text" name='type' onChange={getExtraInfo} value={farmerInfo.type} required/>
            <label htmlFor="type">What Type of Farming are you currently practicing</label>
          </div>
          <div>
              <input type="number" name='farmingExperience' required onChange={getExtraInfo} value={farmerInfo.farmingExperience}/>
                <label htmlFor="farmingExperience">Farming Experience</label>
            </div>
          <div>
            <input type="text" name='location' onChange={getExtraInfo} value={farmerInfo.location} required/>
            <label htmlFor="location">Where is your farmer land located</label>
          </div>
          <div>
            <input type="text" name='comeabout' onChange={getExtraInfo} value={farmerInfo.comeabout} required/>
            <label htmlFor="comeabout">Where did you hear about us</label>
          </div>
          <aside className='next-question'>
            <p onClick={questionaireInfoBack}><a href="#">Back</a></p>
            <button onClick={questionaireInfo}>Next</button>
          </aside>
        </form>
    )}
    {quenstionaireLength === 1 && !checkBox &&(
        <form className='auth-question1'>
             <h1>Tell us About Yourself</h1>
             <figure>
              <img src={consumerInfo.profileImage ? `${consumerInfo.profileImage}` : `https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-855.jpg?size=626&ext=jpg&ga=GA1.1.222711603.1699046896&semt=ais`} width={200} height={200} alt="" />
                <input type="file" name='profileImage' onChange={getProfileImage}/>
             </figure>
             <div>
                <input type="number" name='phoneNumber' onChange={getExtraInfo} value={consumerInfo.phoneNumber}/>
                <label htmlFor="phoneNumber"><i class="fa-solid fa-location-dot"></i><span>PhoneNumber</span></label>
             </div>
             <div>
                <input type="text" name='address' onChange={getExtraInfo} value={consumerInfo.address}/>
                <label htmlFor="address"><i class="fa-solid fa-location-dot"></i><span>Location</span></label>
             </div>

             <div>
                <input type="text" name='nationalId' onChange={getExtraInfo} value={consumerInfo.nationalId}/>
                <label htmlFor="nationalId"><i class="fa-solid fa-id-card"></i><span>NationalId</span></label>
             </div>
             <aside className='next-question'>
             <p onClick={questionaireInfoBack}><a href="#">Back</a></p>
             <button onClick={questionaireInfo} disabled={next}>Next</button>
             </aside>
        </form>
    )}
    {quenstionaireLength === 2 && !checkBox &&(
        <form className='auth-question1'>
             <div>
                <input type="text" name='comeabout' onChange={getExtraInfo} value={consumerInfo.comeabout}/>
                <label htmlFor="comeabout" >How did you hear about us<em>Not Important</em></label>
             </div>
             <aside className='next-question'>
             <p onClick={questionaireInfoBack}><a href="#">Back</a></p>
             <button onClick={questionaireInfo}>Next</button>
             </aside>
        </form>
    )}
    {quenstionaireLength === 3 && !accountCreated&&
    <div className='auth-done'>
        <h2>Finished Set Up</h2>
        <p style={{
      color: 'red',
    }}>{err_Res}</p>
     <p onClick={questionaireInfoBack}><a href="#" id='prev-question'>Back</a></p>
        <button className='sigin-button' onClick={Auth}>Done</button>
      </div>}
    {
      accountCreated && (<ActivationCode res={succesRes} />)
    }
   {quenstionaireLength === 0 && (
    <>
     <p style={{
      color: 'red',
    }} def='def'>{usernameTaken}</p>
    <p style={{
      color: 'red',
    }}>{err_Res}</p>
    <p def='def' onClick={Change__Form}>{isLogin ? "Don't have account": 'Already have an account'}&nbsp;&nbsp;<a href='#'>{isLogin ? "Sign In": 'Login Now'}</a></p>
    <p def='def' >Forgotten your password,<Link to='/reset'><a>Reset</a></Link></p>
    </>
   )}
      </main>
      <figure className='auth-banner-image'  style={{
      backgroundImage: `linear-gradient(195deg, rgba(16, 236, 34, 0.6), rgba(239, 243, 13, 0.6)),url(${data.profileBackgroundImage})`
    }}>
      </figure>
    </section>
    </>
  )
}

export default Auth2