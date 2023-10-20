const handleSubmit = async (e, setCode, code) => {
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