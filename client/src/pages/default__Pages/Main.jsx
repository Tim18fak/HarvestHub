import React from 'react';
import '../default__Pages/styles/Main.css';
import '../default__Pages/styles/Main_Media_Queries.css';
import '../default__Pages/faqScript.jsx';
import { content } from './Main/main';
import {Link} from 'react-router-dom'
const liste = [0, 1, 2, 3, 4];


const Main = () => {
  return (
    <>
      <section className="main-header">
        <div className="row-1">
          <span>Connecting Farmer's</span>
          <button className="btn" style={{
            backgroundImage: `url(${content.image})`
          }}></button>
          <span>To Their Consumer's</span>
        </div>
        <div className="row-2">
          <span>Through Modern Technology</span>
        </div>
        <div className="row-3">
          <div className="col-1 col" style={{
              backgroundImage: `linear-gradient(195deg, rgba(16, 236, 34, 0.6), rgba(239, 243, 13, 0.6)),url(${content.jumbo1})`
            }}>
            <div className="card-header" >
              <h2>Connecting Farmer to Consumer Through Modern Technology</h2>
              <p>We believe that incorporating technology in agriculture can really make a difference in the <b>Agricultural Sector </b>in Africa</p>
              <Link to={'/auth'} style={{
                color: 'wheat',
                padding: '10px'
              }}>Learn more</Link>
            </div>
          </div>
          <div className="col-2 col">
            <div className="card-header">
              Harvesting a bounty of creativity, our UI design blossoms with vibrant colors and intuitive interfaces, cultivating seamless user experiences.
            </div>
            <div className="card-header" style={{
              backgroundImage: `linear-gradient(195deg, rgba(16, 236, 34, 0), rgba(239, 243, 13, 0)),url(${content.jumbo2})`
            }}></div>
          </div>
          <div className="col-3 col" style={{
              backgroundImage: `url(${content.jumbo1})`
            }} >
           <div className="card-header">
            </div>
          </div>
        </div>
      </section>
      <section className="about">
        <div className="about-header">
          <img src="https://img.freepik.com/free-vector/green-leaves-logo_78370-2096.jpg?size=626&ext=jpg&ga=GA1.2.222711603.1699046896&semt=ais" width={50} height={50} className='about-header-icon' alt="" />
          <div className="title">About Us</div>
          <div className="sub-title">Cultivating a Sustainable Future In Modern Agriculture By Modern Technology</div>
        </div>
        <div className="about-contain">
          <div className="big-card" style={{
            backgroundImage: `url(${content.aboutjumbo})`,
          }}>

          </div>
          <div className="sml-card-container">
            <div className="sml-card">
              <h2>90%</h2>
              <h5>Client Satifaction</h5>
              <p>Our clients are happy about the simplicity of our platform, with very basic educational knowledge anyone can use our platform</p>
            </div>
            <div className="sml-card" id='sml-card-2'>
              <h2>50<span>+</span></h2>
              <h5>Farmers</h5>
              <p>We have currently 50 active farmer's using our platform</p>
            </div>
            <div className="sml-card">
              <h2>100<span>+</span></h2>
              <h5>Consumers</h5>
              <p>A weekly increase of consumers by 20%</p>
            </div>
            <div className="sml-card">
              <h2>100%</h2>
              <h5>Fresh produce</h5>
              <p>We encourage organic produce for our farmer's</p>
            </div>
          </div>
        </div>
      </section>

      <section className="why-choose-us">
        <div className="wcu-header">
          <img src="https://img.freepik.com/free-vector/botanical-leaf-doodle-wildflower-line-art_361591-2719.jpg?size=626&ext=jpg&ga=GA1.2.222711603.1699046896&semt=ais" width={60} height={60} alt="" id='wcu-header-icon'/>
          <div className="title">Why Choose Us</div>
          <div className="sub-title">Marketplace for Seamless Transactions</div>
        </div>
        <div className="wcu-contain">
          <div className="row row-1">
            <div className="col col-1" style={{
              backgroundImage: `linear-gradient(220deg, rgba(16, 236, 34, 0), rgba(239, 243, 13, .8)),url(${content.aboutjumbo})`
            }}></div>
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
            {/*<div className="col col-2"></div> commented the old*/}
            <div className="col col-1">
              <div className="card-header">
                <i className="arrow">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                  <path d="M30 2C30 0.895429 29.1046 -1.14894e-06 28 1.04269e-06L10 -5.31252e-08C8.89543 -7.27475e-07 8 0.89543 8 2C8 3.10457 8.89543 4 10 4L26 4L26 20C26 21.1046 26.8954 22 28 22C29.1046 22 30 21.1046 30 20L30 2ZM3.41421 29.4142L29.4142 3.41421L26.5858 0.585786L0.585786 26.5858L3.41421 29.4142Z" fill="black"/>
                </svg>
                </i>
              </div>
              <div className="card-contain">
                <div className="title">Sustainable Agriculture</div>
                <div className="text">Explore sustainable agricultural practices and support farmers committed to environmentally friendly farming. Our marketplace showcases a variety of eco-conscious products, from pesticide-free vegetables to ethically raised livestock, ensuring a positive impact on the planet.</div>
              </div>
            </div>
            {/**end of change card 2. Start of card 3 */}
            <div className="col col-1">
              <div className="card-header">
                <i className="arrow">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                  <path d="M30 2C30 0.895429 29.1046 -1.14894e-06 28 1.04269e-06L10 -5.31252e-08C8.89543 -7.27475e-07 8 0.89543 8 2C8 3.10457 8.89543 4 10 4L26 4L26 20C26 21.1046 26.8954 22 28 22C29.1046 22 30 21.1046 30 20L30 2ZM3.41421 29.4142L29.4142 3.41421L26.5858 0.585786L0.585786 26.5858L3.41421 29.4142Z" fill="black"/>
                </svg>
                </i>
              </div>
              <div className="card-contain">
                <div className="title">Farm-to-Table Delights</div>
                <div className="text">Indulge in the goodness of farm-to-table delights. Our marketplace brings you a delightful selection of freshly harvested goods directly from local farms to your table. Experience the flavors of the season with our carefully curated range of farm-fresh produce and gourmet treats.</div>
              </div>
            </div>
            {/**end for card 3 */}
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


{/* Changes from here */}
      <section className="faq">
        <h1>Frequently Asked Questions</h1>

        <div className="faq-item">
          <button className='faq-question'>What Is HarvestHub?</button>
          <div className="faq-answer">
            <p>HarvestHub is an online farming marketplace connecting consumers directly with local farmers. It provides a platform for buying fresh, locally sourced produce.</p>
          </div>
        </div>

        <div className="faq-item">
          <button className='faq-question'>How Does HarvestHub Support Local Farmers?</button>
          <div className="faq-answer">
            <p>HarvestHub supports local farmers by providing them with a platform to showcase and sell their products directly to consumers, fostering a sustainable and direct farmer-consumer relationship.</p>
          </div>
        </div>

        <div className="faq-item">
          <button className='faq-question'>Can I Buy Fresh Produce Directly from Farmers on HarvestHub?</button>
          <div className="faq-answer">
            <p>Yes, HarvestHub allows you to purchase fresh produce directly from local farmers. It's a convenient way to support local agriculture and enjoy high-quality, farm-fresh products.</p>
          </div>
        </div>

        <div className="faq-item">
          <button className='faq-question'>Can I Leave Reviews for Farmers and Products on HarvestHub?</button>
          <div className="faq-answer">
            <p>Yes, HarvestHub allows you to review local farmers.</p>
          </div>
        </div>

        <div className="faq-item">
          <button className='faq-question'>Is HarvestHub Available Nationwide?</button>
          <div className="faq-answer">
            <p>Yes, HarvestHub is available nationwide.</p>
          </div>
        </div>

              </section>

    </>
  )
}

export default Main

