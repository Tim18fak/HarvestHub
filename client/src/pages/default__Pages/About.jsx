import React from 'react'
import '../default__Pages/styles/About.css'
import { content } from './Main/main'
import {Link} from 'react-router-dom'
const About = () => {
  return (
    <div className="about-container">
      <section className='about-jumbostron' style={{height : (window.innerHeight - 200),
      backgroundImage: `linear-gradient(180deg,rgb(0,128,0,0.5),rgb(154,205,50, 0.5)),url(${content.aboutusJumbo})`}}>
          <h1>About US</h1>
      </section>
      <section className="about-mission">
        <div className="mission-card">
          <div className="mission-card-left">
            <div className="title">Our Mission</div>
            <div className="response-title">
              <span>Connecting Our Farmers</span>
              <span>Directly</span>
              <span>With Their Consumer's</span>
            </div>
          </div>
          <div className="mission-card-right">
            <div className="mission-text">
            <b>HarvestHub </b> is dedicated to cultivating a vibrant and sustainable future for farmers and consumers alike. We envision a marketplace that seamlessly connects local farmers with communities, fostering a transparent and direct exchange of fresh, high-quality produce. 
            Our mission is to empower farmers, promote agricultural diversity, and provide consumers with convenient access to wholesome, locally sourced products. 
            Through HarvestHub, we aim to build a resilient and collaborative ecosystem that celebrates the rich tapestry of our agricultural heritage while supporting the growth of local economies and promoting environmental stewardship.
            </div>
            <button><Link to={'/auth'}>Learn more</Link></button>
          </div>
        </div>
        <div className="mission-big-card">
         <img src={content.aboutusJumbo} alt="Mission image1" />
        </div>
        <div className="mission-small-card">
          <div className="sml-card" style={{
            backgroundImage: `linear-gradient(150deg,rgb(0,128,0,0.7),rgb(255,215,0,0)),url(${content.smlcard1})`
          }}></div>
          <div className="sml-card" style={{
            backgroundImage: `linear-gradient(150deg,rgb(0,128,0,0.3),rgb(255,215,0,.3)),url(${content.smlcard2})`,
            backgroundPosition: 'center'
          }}></div>
          <div className="sml-card" style={{
            backgroundImage: `linear-gradient(150deg,rgb(0,128,0,0.3),rgb(255,215,0,.3)),url(${content.smlcard3})`,
            backgroundPosition: 'center'
          }}></div>
          <div className="sml-card" style={{
            backgroundImage: `linear-gradient(150deg,rgb(0,128,0,0.3),rgb(255,215,0,.3)),url(${content.smlcard4})`,
            backgroundPosition: 'center'
          }}></div>
        </div>
      </section>
      <section className="about-team">
        <div className="head">
          <div className="title">Our Team</div>
          <div className="sub-title">"Empowering Farmers, Enriching Lives: Bridging the Fields to Your Table, One Click at a Time."</div>
        </div>
        <div className="team">
          <div className="card-team">
            <img src={content.HHkini}  alt=""/>
            <div className="card-footer">
              <div className="names">KINI Honoré</div>
              <div className="job">
                <h2>Software Engineer</h2>
                <p>Proud graduating student of Alx software engineering</p>
              </div>
              <div className="buttons">
                <button>More</button>
              </div>
            </div>
          </div>
          <div className="card-team">
            <div className="card-head">

            </div>
            <div className="card-footer">
              <div className="names"> Timothy Avell</div>
              <div className="job">
                <h2>Software Engineer</h2>
                <p>Proud graduating student of Alx software engineering</p>
              </div>
              <div className="buttons">
                <button>More</button>
              </div>
            </div>
          </div>
          <div className="card-team">
          <img src={content.ezekene} alt="" />
            <div className="card-footer">
              <div className="names">Ezinne Kalu</div>
              <div className="job">
                <h2>Software Engineer</h2>
                <p>Proud graduating student of Alx software engineering</p>
              </div>
              <div className="buttons">
                <button>More</button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="about-join-us">
        <div className="card-join-us">
          <div className="title">Become a Part of Our Growing Community</div>
          <div className="text">
            "Discover the richness of local agriculture. Join us to connect with farmers,
            access fresh produce, and contribute to a sustainable farming community. 
            Together, let's cultivate a thriving future!"
          </div>
          <button><Link to={'/auth'} join='get-started'>Get Started</Link></button>
        </div>
      </section>
    </div>
  )
}

export default About