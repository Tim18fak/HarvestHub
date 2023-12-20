import React from 'react';
import '../default__Pages/styles/Main.css';
import '../default__Pages/styles/Main_Media_Queries.css';

const liste = [0, 1, 2, 3, 4];


const Main = () => {
  return (
    <>
      <section className="main-header">
        <div className="row-1">
          <span>Connecting Farmer's</span>
          <button className="btn"></button>
          <span>To Their Consumer's</span>
        </div>
        <div className="row-2">
          <span>Through Modern Technology</span>
        </div>
        <div className="row-3">
          <div className="col-1 col">
            <div className="card-header"></div>
          </div>
          <div className="col-2 col">
            <div className="card-header">
              Harvesting a bounty of creativity, our UI design blossoms with vibrant colors and intuitive interfaces, cultivating seamless user experiences.
            </div>
            <div className="card-header"></div>
          </div>
          <div className="col-3 col">
            <div className="card-header"></div>
          </div>
        </div>
      </section>
      <section className="about">
        <div className="about-header">
          <div className="title">About Us</div>
          <div className="sub-title">Cultivating a Sustainable Future In Modern Agriculture</div>
        </div>
        <div className="about-contain">
          <div className="big-card">

          </div>
          <div className="sml-card-container">
            <div className="sml-card"></div>
            <div className="sml-card"></div>
            <div className="sml-card"></div>
            <div className="sml-card"></div>
          </div>
        </div>
      </section>

      <section className="why-choose-us">
        <div className="wcu-header">
          <div className="title">Why Choose Us</div>
          <div className="sub-title">Marketplace for Seamless Transactions</div>
        </div>
        <div className="wcu-contain">
          <div className="row row-1">
            <div className="col col-1"></div>
            <div className="col col-2">
              <div className="text">Join our marketplace to buy and sell  agricultural products with ease. Connect directly with buyers and sellers, fostering a community-driven approach to agricultural commerce.</div>
              <div className="wcu-sml-cards">
                <div className="wcu-sml-card"></div>
                <div className="wcu-sml-card"></div>
              </div>
            </div>
            <div className="col col-3"></div>
          </div>
          <div className="row row-2">
            <div className="col col-1">
              <div className="card-header">
                <i className="arrow">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                  <path d="M30 2C30 0.895429 29.1046 -1.14894e-06 28 1.04269e-06L10 -5.31252e-08C8.89543 -7.27475e-07 8 0.89543 8 2C8 3.10457 8.89543 4 10 4L26 4L26 20C26 21.1046 26.8954 22 28 22C29.1046 22 30 21.1046 30 20L30 2ZM3.41421 29.4142L29.4142 3.41421L26.5858 0.585786L0.585786 26.5858L3.41421 29.4142Z" fill="black"/>
                </svg>
                </i>
              </div>
              <div className="card-contain">
                <div className="title">Fresh and Local Produce</div>
                <div className="text">Discover a diverse range of fresh, locally sourced produce. From farm-fresh vegetables to organic fruits, our marketplace offers a curated selection of quality products straight from the hands of dedicated farmers.</div>
              </div>
            </div>
            <div className="col col-2"></div>
            <div className="col col-3"></div>
          </div>
        </div>
      </section>

      <section className="empower">
        <div className="empower-container">
          <div className="empower-header">
            <div className="left">Empower Farmers & Connect Buyers</div>
            <div className="right">
              <p>Choose our platform to empower farmers by connecting them directly with consumers, supporting local agriculture.</p>
              <button className="empower-header-btn"></button>
            </div>
          </div>
          <div className="empower-cards">
            <div className="main-card">

            </div>
            <div className="sml-card-contain">
              <h4>Testimonies</h4>
              <div className="sml-card-container">
                {
                  liste.map(value => (
                    <>
                    <div className="sml-card">
                      <div className="sml-card-header">
                        <div className="circle">  
                          
                        </div>
                        <div className="texts">
                          <div className="title">Timothy Avell</div>
                          <div className="sub-title">West-East CatFish Farmer</div>
                        </div>
                      </div>
                      <div className="sml-card-footer">
                        <span>“</span>
                        <p className="text">Loved the Experience HarvestHub Offers</p>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 219" fill="none">
                          <path d="M0 52.9986C69.1401 14.8231 83 103 225 25C367 -53.0001 383 78.9987 600 78.9988C600 109.309 600 143.443 600 170.418C600 187.773 600 196.45 596.513 203.036C593.699 208.351 589.353 212.697 584.038 215.511C577.452 218.998 568.768 218.998 551.4 218.998H48.6C31.232 218.998 22.548 218.998 15.9621 215.511C10.6474 212.697 6.30103 208.351 3.48703 203.036C0 196.45 0 187.766 0 170.398V52.9986Z" fill="#8F8989"/>
                        </svg>
                      </div>
                    </div>  
                    </>
                  ))
                }
              </div>  
            </div>
          </div>
        </div>
      </section>

      <section className="faq">
        <h1>FAQ</h1>

        <button className='faq-question'>What Is HarvestHub ?</button>
        <button className='faq-question'></button>
        <button className='faq-question'></button>
        <button className='faq-question'></button>
        <button className='faq-question'></button>
      </section>
    </>
  )
}

export default Main
