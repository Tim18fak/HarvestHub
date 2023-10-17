import React from 'react'
import { useEffect, useState, useRef } from 'react';
import emailjs from 'emailjs-com';

const InitialFormState = {
fullname: "",
username: "",
email: "",
password: "",
confirmpassword: ""
}



const SignIn = () => {
const [invalid,setinValid] = useState(false)
const [farmer, setFarmer] = useState(false)
const [form, setform] = useState(InitialFormState) 
 const [signUp, setsignUp] = useState(true)
 const [showPass,setshowPass] = useState(true)
 const [showConPass,setConshowPass] = useState(true)

const GetForm = (e) => {
    e.preventDefault();
    if(e.target.name === 'email')
     console.log('hell')
    setform({ ...form, [e.target.name]: e.target.value})
    
}
///

setTimeout(() => {
  setinValid(false)
},6000)
//

const handleSubmit = async (e) => {
  console.log(form)
  e.preventDefault()
  try {
    if(form.password !== form.confirmpassword && signUp)
      throw new Error('Invalid password')
    
  } catch (error) {
    setinValid(!invalid)
    console.log(error)
  }
}

  return (
    <section>
      <form onSubmit={handleSubmit}>
      {signUp && (
          <div>
            <label htmlFor="fullname">FullName</label>
            <input type="text" name='fullname' placeholder='fullname' onChange={GetForm} />
          </div>  
            )}
            {signUp && (
          <div>
            <label htmlFor="username">Username</label>
            <input type="text" name='username' placeholder='username' onChange={GetForm} />
          </div>  
            )}
            {signUp && (
          <div>
            <label htmlFor="Email">Email</label>
            <input type="text" name='email' placeholder='email' onChange={GetForm} />
          </div>  
            )}
           {signUp && (
          <div>
            <label htmlFor="password">Password</label>
            <input type={showPass ? 'password' : 'text'} name='password' placeholder='password' /* onChange={(e) => setPass(e.target.value)} */ onChange={GetForm}/> <span onClick={() => setConshowPass(!showConPass)}>show</span>
          </div>  
            )} 
             {signUp && (
          <div>
            <label htmlFor="confirmpassword">Confirm Password</label>
            <input type={showConPass ? 'password' : 'text'} name='confirmpassword' placeholder='confirmpassword' /* onChange={(e) => setConPass(e.target.value)} */  onChange={GetForm}/> <span onClick={() => setConshowPass(!showConPass)}>show</span>
          </div>  
            )}
            {/*The sign in algorithm*/}
            {!signUp && (
          <div>
            <label htmlFor="username">Username</label>
            <input type="text" name='username' placeholder='username' onChange={GetForm} />
          </div>  
            )}
             {!signUp && (
          <div>
            <label htmlFor="password">Password</label>
            <input type={showPass ? 'password' : 'text'} name='password' placeholder='password' onChange={GetForm} /> <span onClick={() => setshowPass(!showPass)}>show</span>
          </div>  
            )}
           <button disabled={invalid}>{signUp ? "Sign IN" : "Sign Up"}</button>
      </form>
      {signUp && (
        <p><span><input type="checkbox"
        name='farmer' checked={farmer} onChange={() => setFarmer(!farmer)}/>  <span>Are you a farmer</span></span>  
       </p>
      )}
      <p>{!signUp && (
        <p>Don't have an account  <span onClick={() => setsignUp(!signUp)}>{signUp ? "Sign IN" : "Sign Up"}</span></p>
      )}</p>
      {invalid && (
        <p>Password Does not match</p>
      )}
      <p>{signUp && (
        <p>Already have an account  <span onClick={() => setsignUp(!signUp)}>{signUp ? "Sign IN" : "Sign Up"}</span></p>
      )}</p>
    </section>
  )
}
export default SignIn
