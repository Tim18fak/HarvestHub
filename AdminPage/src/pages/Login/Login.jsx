import React, { useState,useEffect } from 'react'
import Cookies from 'universal-cookie'
import Dashboard from '../Dashboard/Dashboard'


const adminInfo = {
  username:'',
  password:'',
  email:''
}
const cookie = new Cookies()
const Login = () => {
  const [adminLoginInfo,setAdminLoginInfo] = useState(adminInfo)
  const [showPassIcon,setShowPassIcon] = useState(true)
  const [adminResponse,setAdminResponse] =  useState('')

  /* To show the adminLoginInfo when am input is added  */
  useEffect(() => {
    console.log(adminLoginInfo);
  }, [adminLoginInfo]);

  const getAdminInfo = (e) => {
    const {name,value} = e.target;
    setAdminLoginInfo({...adminLoginInfo,[name]: value}) 
  }
  const adminLogin = (e) => {
    e.preventDefault()
    const url = 'http://localhost/admin/adminLogin'
    const {username,password,email} = adminLoginInfo
    fetch(url,{
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'username':username,
          'email': email,
          'password': password
        })
    })
    .then((response) => {
      if(!response.ok) console.log('error')
      response.json()
    .then((data) => {
      console.log(data)
      if(response.status > 400){
        setAdminResponse(data.message)
        console.log(data)
      }
      if(data._id && data.adminId && data.adminToken){
        cookie.set('token',data._id,{
          domain: ''
        })
        cookie.set('adminAuthToken',data.adminId,{
          domain: ''
        })
        cookie.set('id',data.adminToken)
        const id = cookie.get('id')
        if(id === data.adminToken){
          window.location.replace('/dashboard')
        }
      }
    })
    .catch((error) => {
      console.error(error)
    })
    })
  .catch((err) =>{
    console.error(err.message)
  })


  }
  const displayPassword = () => {
    setShowPassIcon((prev) => !showPassIcon)
  }

  /*  */
  return (
    <>
    <form onSubmit={adminLogin} method='Post'>
      <p>{adminResponse}</p>
      <div>
        <input type="text" name='username' placeholder='username' onChange={getAdminInfo}/>
    <label htmlFor="username">Username</label>
      </div>
      <div>
        <input type="text" name='email' placeholder='email' onChange={getAdminInfo}/>
    <label htmlFor="email">email</label>
      </div>
      <div>
        <aside><input type={showPassIcon ? 'password' : 'text'} name='password' placeholder='password' onChange={getAdminInfo}/>
        {showPassIcon && (
          <span onClick={displayPassword}>''</span>
        )}
        {!showPassIcon && (
          <span onClick={displayPassword}>👁️</span>
        )}
        </aside>
    <label htmlFor="password">password</label>
      </div>
      <div>

      </div>
      <button>Login Now</button>
    </form>
    </>
  )
}

export default Login