import React, { useState } from 'react'

const ActivationCode = ({ res }) => {
    const [confirmCode,setConfirmCode] = useState('')
    console.log(res)
    const { _id,isFarmer} = res
    const submitActivationCode = (e) => {
        e.preventDefault()
        const activationCodeUrl = `http://localhost/auth//activation?clientId=${_id}`
        fetch(activationCodeUrl,{
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({'code': confirmCode,'isFarmer': isFarmer})
        })
        .then((response) => {
            if(response.status === 200){
                window.location.replace('/auth')
            }
        })
    }
    const activeCode =  (e) => {
        const {value} = e.target
        setConfirmCode(value)
    }
  return (
    <form onSubmit={submitActivationCode}>
        <div>
           <span>HHB-</span> <input type="number" onChange={activeCode}/>
        </div>
        <button>Sumbit ActivationCode</button>
    </form>
  )
}

export default ActivationCode