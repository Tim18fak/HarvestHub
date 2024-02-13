import React, { useState } from 'react'
import './contact.css'
const emailTemplate = {
  senderEmail:'',
  message:'',
  fullname:''
} 
const Contact = () => {
  const [form,setForm] = useState()
  return (
    <>
    <section className='contact-us-jumbostron'>

    </section>
    <section className='contact-us'>
      <aside>
    <h2 className='contact-title'>Contact Us</h2>
    <p>You can reach out to use through the following means</p>
    <main className='contact-section'>
      <div>
        <a href="tel:++23490234567"><i class="fa-solid fa-phone fa-beat"></i></a>
        <article>
          <h2>Phone</h2>
          <p>+2349023456789</p>
        </article>
      </div>
      <div>
        <a href="mailto:harvesthub@gmail.com"><i class="fa-solid fa-envelope fa-shake"></i></a>
        <article>
          <h2>Mail</h2>
          <p>harvesthub@gmail.com</p>
        </article>
      </div>
      <div>
        <a><i class="fa-solid fa-location-dot"></i></a>
        <article>
          <h2>Location</h2>
          <p>3,iju-street,Lagos-Nigeria</p>
        </article>
      </div>
    </main>
      </aside>
      <main className='contact-email'>
      <div>
      <h2>Write us a Message</h2>
      <p>Tell us your Feedback</p>
      </div>
      <div>
        <main className='contact-input'>
        <input type="text"  placeholder='Email'/>
        </main>
        <main className='contact-input'>
        <input type="text" placeholder='Fullname'/>
        </main>
      </div>
      <div>
        <textarea name="" id="" cols="30" rows="10" placeholder='Your Feedback' className='textarea'></textarea>
      </div>
      <button className='send-feedback'>Send Feedback</button>
      </main>
    </section>
    </>
  )
}

export default Contact