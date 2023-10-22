import React from "react";
import { useState,useRef } from "react";
import axios from 'axios';
import Account from "./Account";
import Cookies from "universal-cookie";

const cookie = new Cookies()

const CodeConfirmation = ({ form, isFarmer }) => {
    const [digit1, setDigit1] = useState('');
    const [digit2, setDigit2] = useState('');
    const [digit3, setDigit3] = useState('');
    const [digit4, setDigit4] = useState('');

    const [statusCode, setStatusCode] = useState(0)
    const [response, setResponse] = useState('')
    const [acctCreate,setAcctCreate] = useState(true)
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
    const submit = async (e) => {
      e.preventDefault()
      const URL = 'https://localhost/auth/signup'
      const code = `${digit1}${digit2}${digit3}${digit4}`
      const Code = sessionStorage.getItem('code')
      const {fullname, username, email, password} = form
    fetch(`${URL}`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({fullname, username, email, password})
    })
    .then(response => {
      setStatusCode(response.status)
      response.json()
      .then(data => {
        if(statusCode === 200)
          cookie.set('username', data.username)
          cookie.set('userId', data._id)
          cookie.set('fullname', data.fullname)
        setResponse(data.message)
      })
      .catch(error => {})
    })
    .then(error => {})
    }
    ;
  
    return (
      <>
      { acctCreate && (
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
        <p>{response}</p>
        <button>Check Code</button>
      </form>
      )}
      {!acctCreate && (
        <section>
          <h1>Account</h1>
        </section>
      )}
      </>
    );
  }

  export default CodeConfirmation;