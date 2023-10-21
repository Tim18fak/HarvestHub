import React from 'react'
import { useEffect, useState, useRef } from 'react';
import emailjs from 'emailjs-com';
import axios from 'axios';
import CodeConfirmation from './CodeConfirmation';
import Cookies from 'universal-cookie'

const cookies = new Cookies();

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
 const [code , setCode] = useState(false)
 const [statusCode,setStatusCode] = useState('')
 const [responseData,setResponseData] = useState('')
 const [reset,setReset] = useState(false)
const [dashboard,setDashboard] = useState(false)


const GetForm = (e) => {
    e.preventDefault();
    if(e.target.name === 'email')
     console.log('hell')
    setform({ ...form, [e.target.name]: e.target.value})
    
}
///

//
const handleLogin = (e) => {
  e.preventDefault()
  console.log('fff')
  const {username, password} = form
  fetch('https://localhost/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({username, password}),
})
.then(response => {
  if (response.ok) {
    // The request was successful
    console.log('Status Code:', response.status);
    setStatusCode(response.status)
    
    
    response.json() // Read response body as JSON
    .then(data => {
      console.log('Response Message:', data.message);
      const {username, fullname, _id} = data.message;

      cookies.set('userId', _id);
      cookies.set('fullName', fullname);
      cookies.set('username', username);
      const re = cookies.getAll({username,_id, fullname})
      console.log(re)
    })
    .catch(error => {
      console.error('Error reading response as JSON:', error);
    });
  } else {
    // The request encountered an error (e.g., 404 Not Found)
    console.error('Error Status Code:', response.status);
    response.json()
    .then(data => {
      console.error('Error Message:', data.message);
      setResponseData(data.message)
    })
    .catch(error => {
      console.error('Error reading error response as JSON:', error);
    });
  }
})
.catch(error => {
  console.error('Request error:', error);
});


}

const handleSignUp = async (e) => {
  e.preventDefault()
  console.log(reset)
setTimeout(() => {
  setinValid(false)
},6000)
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

     /* setTimeout(() => {
      sessionStorage.clear()
     },) */// delay

  } catch (error) {
    setinValid(!invalid)
    console.log(error)
  }
}
dashboard ? return  
  return (
    <>
    {!code && (
    <section>
      <form onSubmit={signUp ? handleSignUp : handleLogin}>
      {signUp && (
          <div>
            <label htmlFor="fullname">FullName</label>
            <input  type="text" name='fullname' placeholder='fullname' required onChange={GetForm} />
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
            {/* <p>{responseData}</p> */}
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
