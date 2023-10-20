import React from 'react'
import { useEffect, useState, useRef } from 'react';
import emailjs from 'emailjs-com';
import axios from 'axios';
import CodeConfirmation from './CodeConfirmation';
const InitialFormState = {
fullname: "",
username: "",
email: "",
password: "",
confirmpassword: ""
}


////////////// 


const SignIn = () => {
const [invalid,setinValid] = useState(false)
const [farmer, setFarmer] = useState(false)
const [form, setform] = useState(InitialFormState) 
 const [signUp, setsignUp] = useState(true)
 const [showPass,setshowPass] = useState(true)
 const [showConPass,setConshowPass] = useState(true)
 const [code , setCode] = useState(false)
 const [reset,setReset] = useState(false)

const GetForm = (e) => {
    e.preventDefault();
    if(e.target.name === 'email')
     console.log('hell')
    setform({ ...form, [e.target.name]: e.target.value})
    
}
///
console.log(reset)
setTimeout(() => {
  setinValid(false)
},6000)
//



  return (
    <>
    {!code && (
    <section>
      <form onSubmit={handleSubmit}>
      {signUp && (
          <div>
            <label htmlFor="fullname">FullName</label>
            <input type="text" name='fullname' placeholder='fullname' required onChange={GetForm} />
          </div>  
            )}
            {signUp && (
          <div>
            <label htmlFor="username">Username</label>
            <input type="text" name='username' placeholder='username' required onChange={GetForm} />
          </div>  
            )}
            {signUp && (
          <div>
            <label htmlFor="Email">Email</label>
            <input type="text" name='email' placeholder='email' required onChange={GetForm} />
          </div>  
            )}
           {signUp && (
          <div>
            <label htmlFor="password">Password</label>
            <input type={showPass ? 'password' : 'text'} name='password' placeholder='password' required /* onChange={(e) => setPass(e.target.value)} */ onChange={GetForm}/> <span onClick={() => setConshowPass(!showConPass)}>show</span>
          </div>  
            )} 
             {signUp && (
          <div>
            <label htmlFor="confirmpassword">Confirm Password</label>
            <input type={showConPass ? 'password' : 'text'} name='confirmpassword' required placeholder='confirmpassword' /* onChange={(e) => setConPass(e.target.value)} */  onChange={GetForm}/> <span onClick={() => setConshowPass(!showConPass)}>show</span>
          </div>  
            )}
            {/*The sign in algorithm*/}
            {!signUp && (
          <div>
            <label htmlFor="username">Username</label>
            <input type="text" name='username' placeholder='username' required onChange={GetForm} />
          </div>  
            )}
             {!signUp && (
          <div>
            <label htmlFor="password">Password</label>
            <input type={showPass ? 'password' : 'text'} name='password' placeholder='password' required onChange={GetForm} /> <span onClick={() => setshowPass(!showPass)}>show</span>
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
      <p on>Forgot your password: <button disabled={reset} onClick={() => setReset(!reset)}>Reset It</button></p>
      {reset && (
        <h2>HEllo</h2>
      )}
    </section>
    )}
    {code && (
      <CodeConfirmation form={form}/>
    )}
    </>
  )
}
export default SignIn
