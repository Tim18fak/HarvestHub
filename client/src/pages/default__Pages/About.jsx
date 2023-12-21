/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import '../default__Pages/styles/About.css'
import missionImage from 'client/src/pages/default__Pages/images/mission-image1.jpeg';
const About = () => {
  return (
    <div className="about-container">
      <section className='about-head' style={{height : (window.innerHeight - 125)}}>
        <div className="about-col1 about-col">
          <h1>About Us</h1>
          <div className="about-card"></div>
        </div>
        <div className="about-col2 about-col">
          <div className="about-card"></div>
        </div>
        <div className="about-col3 about-col">
          <div className="about-card"></div>
          <div className="about-card"></div>
        </div>
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
            HarvestHub is dedicated to cultivating a vibrant and sustainable future for farmers and consumers alike. We envision a marketplace that seamlessly connects local farmers with communities, fostering a transparent and direct exchange of fresh, high-quality produce. 
            Our mission is to empower farmers, promote agricultural diversity, and provide consumers with convenient access to wholesome, locally sourced products. 
            Through HarvestHub, we aim to build a resilient and collaborative ecosystem that celebrates the rich tapestry of our agricultural heritage while supporting the growth of local economies and promoting environmental stewardship.
            </div>
            <button>Learn More ...</button>
          </div>
        </div>
        <div className="mission-big-card">
         <img src={missionImage} alt="Mission image1" />
        </div>
        <div className="mission-small-card">
          <div className="sml-card"></div>
          <div className="sml-card"></div>
          <div className="sml-card"></div>
          <div className="sml-card"></div>
        </div>
      </section>
      <section className="about-team">
        <div className="head">
          <div className="title">Our Team</div>
          <div className="sub-title">"Empowering Farmers, Enriching Lives: Bridging the Fields to Your Table, One Click at a Time."</div>
        </div>
        <div className="team">
          <div className="card-team">
            <div className="card-head">

            </div>
            <div className="card-footer">
              <div className="names">KINI Honoré</div>
              <div className="job">Software Engineer</div>
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
              <div className="job"> Software Engineer</div>
              <div className="buttons">
                <button>More</button>
              </div>
            </div>
          </div>
          <div className="card-team">
            <div className="card-head">

            </div>
            <div className="card-footer">
              <div className="names">Ezinne Kalu</div>
              <div className="job"> Software Engineer</div>
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
          <button>Get Started</button>
        </div>
      </section>
    </div>
  )
}

export default About