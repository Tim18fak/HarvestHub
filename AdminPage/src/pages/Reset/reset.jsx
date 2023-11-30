import React, { useState } from 'react'

const resetEmail = {
    email: ''
}
const Reset = () => {
    const [email,setEmail] = useState('')

    const getAdminInfo = (e) => {
        const {name,value} = e
        setEmail({...email,[name]: value})
    }
    const ResetPass = () => {

    }
  return (
    <form method="post" onSubmit={ResetPass}>
        <div>
        <input type="text" name='username' placeholder='username' onChange={getAdminInfo}/>
    <label htmlFor="username">Username</label>
      </div>
    </form>
  )
}

export default Reset