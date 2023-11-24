import React, { useEffect, useState } from 'react'
import Reset from './Reset'
import { cookie } from '../../../configs/default__configs/cookies'

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

const Auth = () => {
  const [isLogin,setIsLoginIn] = useState(true)
  const [comparePass,setComparePass] =  useState(true)
  const [userInfo,setUserInfo] = useState(isLogin ? loginInfo : signInInfo)
  const [checkBox,setCheckBox] = useState(false)
  const [usernameTaken,setUserTaken] = useState('')

  /* algorithm to ensure that user's enter the same password */
  useEffect(() => {
    if(isLogin === false){
      if(userInfo.password === userInfo.confirm__password){
        setComparePass((prev) => !comparePass)
      }else{
        setComparePass(true)
      }
    }
  },[userInfo])

  useEffect(() => {
    if(userInfo.username && !isLogin){
      const {username} = userInfo
      const URL = `http://localhost/auth/fS/${username}/${checkBox}`
      fetch(URL)
      .then((response) => {
        if(!response.ok){
          console.log(response)
        }
        switch (response.status) {
          case 200:
            console.log('username not taken')
            setUserTaken(null)
            break;
          case 403:
            setUserTaken('username taken')
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
      const {email,username,isFarmer,password,confirm__password,} = userInfo
    fetch(url,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: isLogin ? JSON.stringify({
        email,
        username,
        password
      }) : JSON.stringify({
        email,
        username,
        isFarmer,
        password,
        confirm__password
      })
      })
      .then((response) => {
        if(!response.ok){

        }
        response.json()
        .then((data) => {
          if(isLogin){
            const {isFarmer,accessToken,username,_id} = data;
            cookie.set('username',username)
            cookie.set('isFarmer',isFarmer)
            cookie.set('_id',_id)
            cookie.set('accessToken',accessToken)
            if(data.isFarmer){
              window.location.replace('/fM/dashboard')
            }else{
              window.location.replace('/cN/dashboard')
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
}
/* Gather user info */
const getUserInfo = (e) => {
  const {name,value} = e.target;
  setUserInfo({...userInfo,[name]: value})
}

/* get Info from isFarmer checkbox */
const isFarmerCheckBox = (e) => {
  setCheckBox((prev) => !checkBox)
}
  return (
    <>
    <form method="post" onSubmit={Auth}>
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
    {!isLogin && (
       <div>
       <input type="checkbox" name='isFarmer' checked={checkBox} onChange={isFarmerCheckBox}/>
       <label htmlFor="isFarmer">Are You A Farmer</label>
     </div>
    )
    }
    <button disabled={!isLogin && comparePass ? true : false}>{isLogin ? "Login In" : "Sign In"}</button>
    </form>
    <p style={{
      color: 'red',
    }}>{usernameTaken}</p>
    <p onClick={Change__Form}>{isLogin ? "Don't have account": 'Already have an account'}&nbsp;&nbsp;<a href='#'>{isLogin ? "Sign In": 'Login Now'}</a></p>
    <p>Forgotten your password,<a href="/reset">Reset</a></p>
    </>
  )
}

export default Auth