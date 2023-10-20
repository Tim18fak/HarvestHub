function CodeConfirmation({ form }) {
    const [digit1, setDigit1] = useState('');
    const [digit2, setDigit2] = useState('');
    const [digit3, setDigit3] = useState('');
    const [digit4, setDigit4] = useState('');
  
    const inputRefs = {
      digit1Ref: useRef(),
      digit2Ref: useRef(),
      digit3Ref: useRef(),
      digit4Ref: useRef(),
    };
  
    const handleInputChange = (e, currentDigit, nextRef) => {
      const input = e.target;
      const value = input.value;
  
      try {
        // Ensure that only one digit is allowed
      if (/^\d*$/.test(value) && value.length <= 1) {
        currentDigit(value);
  
        // If a digit is entered, focus on the next input field
        if (value !== '' && nextRef.current) {
          nextRef.current.focus();
        }
      }
      } catch (error) {
        console.log(error.message)
        
      }
    }
  const SignIn =  async (code,Code, form) => {
    const {fullname, username, email, password, confirmpassword} = form
  
    const URL = 'https://localhost/auth/signup'
    const {data} = await axios.post(`${URL}`,{
      fullname,
      username,
      email,
      password,
      confirmpassword,
      code,
      Code
     }) 
     
     return  data;
     
  }
  
    const submit = (e) => {
      e.preventDefault()
    try {
      const code = `${digit1}${digit2}${digit3}${digit4}`
      const Code = sessionStorage.getItem('code')
      const data = SignIn(code,Code,form)
      console.log()
    } catch (error) {
      
    }
    }
    ;
  
    return (
      <form onSubmit={submit}>
        <input
          ref={inputRefs.digit1Ref}
          value={digit1}
          onChange={(e) => handleInputChange(e, setDigit1, inputRefs.digit2Ref)}
          maxLength="1"
        />
        <input
          ref={inputRefs.digit2Ref}
          value={digit2}
          onChange={(e) => handleInputChange(e, setDigit2, inputRefs.digit3Ref)}
          maxLength="1"
        />
        <input
          ref={inputRefs.digit3Ref}
          value={digit3}
          onChange={(e) => handleInputChange(e, setDigit3, inputRefs.digit4Ref)}
          maxLength="1"
        />
        <input
          ref={inputRefs.digit4Ref}
          value={digit4}
          onChange={(e) => handleInputChange(e, setDigit4, null)}
          maxLength="1"
        />
        <button>Check Code</button>
      </form>
    );
  }

  export default CodeConfirmation;