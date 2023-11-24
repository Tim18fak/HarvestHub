import React, {useState} from 'react'

const Reset = () => {
    const [email,setEmail] = useState('')
    const [isFarmer,setIsFarmer] =  useState(false)
    const [emailSent,setEmailSet] =  useState(false)
    const submitResetPassRequest = (e) => {
        e.preventDefault()
       if(email){
        const URL = 'http://localhost/auth/reset'
        fetch(URL,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                email: email,
                isFarmer: isFarmer
              })
        })
        setEmailSet((prev) => !emailSent)
       }
    }
    const ResetPass = (e) => {
        const {name,value} = e.target
        setEmail(value)
        console.log(email)
    }
    const isFarmerCheckBox = () => {
        setIsFarmer((prev) => !isFarmer)
        console.log(isFarmer)
    }

  return (
    <>
<a href="/auth">Back</a>
<section>
    {!emailSent && (
        <form onSubmit={submitResetPassRequest}>
        <div>
           <input type="text" name='email' onChange={ResetPass} />
            <label htmlFor="email" ></label>
            </div>
            <div>
            <input type="checkbox" name='isFarmer' checked={isFarmer} onChange={isFarmerCheckBox}/>
            <label htmlFor="isFarmer" onClick={isFarmerCheckBox}>Are you a farmer</label>
            </div>
        <button>Reset Password</button>
    </form>
    )}
    {emailSent && (
        <main>
            <p>We will check to see if your email exist, if so please check you email for your temporary password</p>
        </main>
    )}
</section>
</>
  )
}

export default Reset
 