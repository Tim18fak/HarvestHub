import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../../hooks/useContext/ConsumerInfo';
const farmerBio = {
  name: '',
  email: '',
  address: '',
  nationalId: '',
  phoneNumber: '',
  driverLicence: '',
  farmingExperience: '',
};

const farm = {
  type: '',
  location: '',
};

const FarmerProfile = ({state, farmerProfile}) => {
  const [profile,setProfile] = useState(farmerProfile)
  const [bio, setBio] = useState(farmerBio);
  const [farmBio,setFarmBio] = useState(farm)
  const [bioImage, setBioImage] = useState('');
  const userInfo = useContext(UserContext);

  useEffect(() => {
    setProfile(farmerProfile)
  },[farmerProfile])

 /*  useEffect(() => {
    console.log(bio)
    console.log(farmBio)
  },[farmBio,bio]) */

 
  /* Get Profile image from user */
  const getBioImage = (e) => {
    const { files } = e.target;
    setBioImage();
    const bioFile =  new FileReader()
    bioFile.onload = (e) => {
      const processedBioImage = e.target.result;
      setBioImage(processedBioImage)
      console.log(bioImage)
    }
    bioFile.readAsDataURL(files[0]);
  };
  console.log(bioImage)
  const getInfo = (e) => {
    const {name,value} = e.target;
    setBio({...bio,[name]: value})
  }

  const farmInfo = (e) => {
    const {name,value} = e.target;
    setFarmBio({...farmBio,[name]: value})
    console.log(farmBio)
  }

  /* Submit BioData */
  const bioSubmit = async (e) => {
    e.preventDefault();
    console.log(userInfo)
    try {
      const bioUrl = `http://localhost/farmerUser/updateprofile/${userInfo._id}`;
      fetch(bioUrl,{
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${profile.accessToken}`
        },
        body: JSON.stringify({
          bioImage:bioImage,
          bio: bio,
          farm: farmBio
        })
      })
      .then((response) => {

      })
      .catch((err) => {
        
      })
      
    } catch (err) {
      console.error(err.message);
    }
  };

  // Check if userInfo is available before calling getBio
  if (!state) {
    // Handle the case when userInfo is not available
    return <div>Loading...</div>;
  }
  return (
    <>
      <section>
    <aside>
            <img src={!bioImage ? 'https://img.freepik.com/free-vector/farmer-using-technology-digital-agriculture_53876-113813.jpg?size=626&ext=jpg&ga=GA1.1.222711603.1699046896&semt=ais' : bioImage} width={200} height={200} alt="" />
      </aside>
      <form action="" onSubmit={bioSubmit}>
        <main>
        <div>
          <input type="file" onChange={getBioImage} />
        </div>
        <div>
          <input type="text" name='name' onChange={getInfo} required />
          <label htmlFor="name">Your Fullname</label>
        </div>
        <div>
          <input type="text" name='email' value={!bio.email ? profile.email : bio.email} onChange={getInfo} required/>
          <label htmlFor="email">Email</label>
        </div>
        <div>
          <input type="text" name='address' onChange={getInfo} required/>
          <label htmlFor="address">Your Address</label>
        </div>
        <div>
          <input type="text" name='nationalId' onChange={getInfo} required />
          <label htmlFor="nationalId">National_ID Number</label>
        </div>
        <div>
          <input type="text" name='phoneNumber' onChange={getInfo} required/>
          <label htmlFor="phoneNumber">Your Phone Number</label>
        </div>
        <div>
          <input type="text" name='driverLicence' onChange={getInfo}/>
          <label htmlFor="driverLicence"> Your Driver's Licence</label>
          <strong>This is not required</strong>
        </div>
        <div>
          <input type="text" name='farmingExperience' onChange={getInfo}/>
          <label htmlFor="farmingExperience">How long have you been in the farming business</label>
        </div>
        </main>

       <main>
        <h3>Farm Information</h3>
       <div>
          <input type="text" name='type' onChange={farmInfo} />
          <label htmlFor="type" required>What Type Of Farming Are You Currently Practicing??</label>
        </div>
        <div>
          <input type="text" name='location' onChange={farmInfo} required />
          <label htmlFor="location">Where is your farm located??</label>
        </div>
       </main>
       <button>Update Your Bio</button>
      </form>
    </section>
    </>
  )
}

export default FarmerProfile
