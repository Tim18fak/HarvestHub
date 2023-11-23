import React, { useState } from 'react'

const Reset = () => {
    const [email,setEmail] = useState('')
    const [isFarmer,setIsFarmer] =  useState(false)
    const [emailSent,setEmailSet] =  useState(false)
    const ResetPass = (e) => {
        const {name,value} = e.target
        setEmail(value)
        console.log(email)
    }
    const isFarmerCheckBox = () => {
        setIsFarmer((prev) => !isFarmer)
        console.log(isFarmer)
    }
    const SubmitResetPassRequest = () => {
        const RESET_URL = 'http://localhost/auth/uu/hh/reset'
        const farmer =  isFarmer
        fetch('http://localhost/auth/uu/hh/reset',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                isFarmer: farmer,
            })
        })
        .then((response) => {
            if(!response.ok){

            }
            response.json()
            .then((data) => {
                console.log(data)
            })
        })
    }
  return (
    <>
    <form method='post' onSubmit={SubmitResetPassRequest}>
                <p><a href="/auth">Back</a></p>
                <div>
                <input type="text" name='email' onChange={ResetPass} />
                <label htmlFor="email" ></label>
                </div>
                <div>
                <input type="checkbox" name='isFarmer' checked={isFarmer} />
                <label htmlFor="isFarmer" onClick={isFarmerCheckBox}>Are you a farmer</label>
                </div>
                <button>Reset Password</button>
            </form>
    </>
  )
}

export default Reset