
import React, {useState} from 'react'

const InitialResetFormState = {
    email: "",
    }

const Reset = () => {
    const [responseData,setResponseData] = useState('')
    const [form, setform] = useState(InitialResetFormState)
    const [farmer, setFarmer] = useState(false)


    const GetForm = (e) => {
        e.preventDefault();
        setform({ ...form, [e.target.name]: e.target.value})
    }

    const resetPass = (e) => {
        e.preventDefault()
        const {email} = form;
        const Url = 'https://localhost/auth/reset'
        fetch(`${Url}`,{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({email, farmer}),
        })
        .then(response => {
          if(response)
            console.log(response.status)
            response.json() // Read response body as JSON
          .then(data => {
            
            console.log('Response Message:', data.message);
            setResponseData(data.message)
          })
          .catch(error => {
            console.error('Error reading response as JSON:', error);
          });
        })
        .then(error => {})
      }
  return (
    <section>
        <form onSubmit={resetPass}>
          <input type="text" name='email' onChange={GetForm}/>
          <label htmlFor="email">Email</label>
          
        <p><span><input type="checkbox"
        name='farmer' checked={farmer} onChange={() => setFarmer(!farmer)}/>  <span onClick={() => setFarmer(!farmer)}>Are you a farmer</span></span>  
       </p>
          <button>Reset Password</button>
        </form>
        <p>{responseData}</p>
      </section>
  )
}

export default Reset
