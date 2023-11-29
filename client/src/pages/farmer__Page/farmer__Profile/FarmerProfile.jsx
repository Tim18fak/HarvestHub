import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../../hooks/useContext/ConsumerInfo';
import { Axios } from '../../../../configs/default__configs/axios.config';

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
  farmSpecialization: '',
};

const FarmerProfile = ({state, farmerProfile}) => {
  const [profile,setProfile] = useState(farmerProfile)
  const [bio, setBio] = useState(farmerBio);
  const [farmBio,setFarmBio] = useState(farm)
  const [bioImage, setBioImage] = useState([]);
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
    setBioImage(files[0]);
  };

  const getInfo = (e) => {
    const {name,value} = e.target;
    setBio({...bio,[name]: value})
    console.log(bio)
  }

  const farmInfo = (e) => {
    const {name,value} = e.target;
    setFarmBio({...farmBio,[name]: value})
  }

  /* Submit BioData */
  const bioSubmit = async (e) => {
    e.preventDefault();
    try {
      const bioUrl = '';
      const bioFile = new FileReader();
      bioFile.onload = (e) => {
        const processedBioImage = e.target.result;
        fetch('',{
          headers :{
            'Content-Type': 'application/json',
                  'Authorization': `Bearer ${userInfo.accessToken}`
          },
          body: JSON({
            profileImage:processedBioImage
          })
        })
        console.log(processedBioImage);
      };
      bioFile.readAsDataURL(bioImage);
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
            <img src="" width={200} height={200} alt="" />
      </aside>
      <form action="" onSubmit={bioSubmit}>
        <main>
        <div>
          <input type="file" onChange={getBioImage} />
        </div>
        <div>
          <input type="text" name='name'  required />
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
          <input type="text" name='type' />
          <label htmlFor="type" required>What Type Of Farming Are You Currently Practicing??</label>
        </div>
        <div>
          <input type="text" name='location' required />
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
