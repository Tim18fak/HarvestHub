import React, { useState } from 'react'

const ActivationCode = ({ res }) => {
    const [confirmCode,setConfirmCode] = useState('')
    const id = res
    console.log(id)
    const submitActivationCode = (e) => {
        e.preventDefault()
        const activationCodeUrl = `http://localhost/auth//activation?clientId=${id}`
        fetch('',{
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({'code': confirmCode})
        })
        .then((response) => {
            if(response.status <= 300){
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
           <span>HHB-</span> <input type="text" onChange={activeCode}/>
        </div>
        <button>Sumbit ActivationCode</button>
    </form>
  )
}

export default ActivationCode