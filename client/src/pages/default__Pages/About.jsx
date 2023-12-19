/* eslint-disable react/no-unescaped-entities */
import React from 'react'
<<<<<<< HEAD
import '../default__Pages/styles/About.css'
=======
import './About.css'
>>>>>>> bed6a0b713db0c91438fe0ddbd1dd41e328dcf2f

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
              <span>Connecting Our Farme</span>
              <span>&&</span>
              <span>With Their Consummer's</span>
            </div>
          </div>
          <div className="mission-card-right">
            <div className="mission-text">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptates beatae, quod quam deserunt nobis velit consectetur ipsum possimus laborum eius! Totam libero rerum vero. Optio cupiditate dolor laboriosam odit aspernatur.
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto culpa commodi, praesentium quisquam quos magnam. Reprehenderit illum ipsam quasi, consectetur sapiente nostrum molestiae dignissimos cumque repudiandae! Dolor nihil impedit ullam!  
            </div>
            <button>Learn More ...</button>
          </div>
        </div>
        <div className="mission-big-card">

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
<<<<<<< HEAD
              <div className="names">KINI Honoré</div>
=======
              <div className="names">KINI Biè Honoré</div>
>>>>>>> bed6a0b713db0c91438fe0ddbd1dd41e328dcf2f
              <div className="job">Our Front Developer</div>
              <div className="buttons">
                <button>More</button>
              </div>
            </div>
          </div>
          <div className="card-team">
            <div className="card-head">

            </div>
            <div className="card-footer">
<<<<<<< HEAD
              <div className="names"></div>
              <div className="job"></div>
=======
              <div className="names"> Timothy Avell</div>
              <div className="job"> Our Backend Developer</div>
>>>>>>> bed6a0b713db0c91438fe0ddbd1dd41e328dcf2f
              <div className="buttons">
                <button>More</button>
              </div>
            </div>
          </div>
          <div className="card-team">
            <div className="card-head">

            </div>
            <div className="card-footer">
<<<<<<< HEAD
              <div className="names"></div>
              <div className="job"></div>
=======
              <div className="names">Timothy and Honoré</div>
              <div className="job"> Both are partners</div>
>>>>>>> bed6a0b713db0c91438fe0ddbd1dd41e328dcf2f
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