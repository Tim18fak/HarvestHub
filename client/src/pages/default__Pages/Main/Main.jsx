import React from 'react'
import './main.css'
import { content } from './main'
const Main = () => {
  return (
    <>
    <section className='welcome__jumbostron'>
      <h2><span>Connecting Farmer’s</span><img src={content.image} alt="" /><span>To Their Consumer’s</span></h2>
      <h1>Through Modern Technology</h1>
    </section>
    <section className='jumbostron-class__images'>
    <div className='jumbostron__images' style={{
      backgroundImage: `url(${content.jumboImageFirst})`
    }} >
      <main style={{
        
      }}></main>
    </div>
    <div className='jumbostron__images jumbo-image_second'></div>
    <div className='jumbostron__images'>
    <main></main>
    </div>
    </section>
    {/* About Us */}
    <section className='aboutus_content'>
      <h3>ABOUT US</h3>
      <main>
      <div>
        <h1>{content.aboutUs_h1}</h1>
        <p>{content.aboutUs_p}</p>
      </div>
      <div>

      </div>
      </main>
      <aside>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </aside>
    </section>
    {/* why choose us */}
    <section>
      <main>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </main>
    </section>
    {/* empower */}
    <section>
      <aside>
        <h2>
        Empower Farmers <span>&&</span>Connect Buyers
        </h2>
      </aside>
      <main>
        
      </main>
    </section>
    </>
  )
}

export default Main
