import React from 'react'
import { useEffect, useState, useRef } from 'react';
import emailjs from 'emailjs-com';
import axios from 'axios';

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

const handleSubmit = async (e) => {
  console.log(form)
  e.preventDefault()
  const delay = 60000
  try {
   if(signUp)
     if(form.password !== form.confirmpassword && signUp){
       throw new Error('Invalid password')
     }
     const {data} = await axios.get('https://localhost/auth/code')

     sessionStorage.setItem('code',data)
     setCode(!code)
     const Code = emailjs.send('service_8j5w9uo','template_6u3tdjn',{
      to_email: form.email,
      to_name: form.username,
      message: data,
      from_name: 'HarvestHub'
     },'SUr8z-MuiQP8fGoSl')
     console.log(Code)

     setTimeout(() => {
      sessionStorage.clear()
     },)// delay

  } catch (error) {
    setinValid(!invalid)
    console.log(error)
  }
}

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
