import React, {useState, useEffect, useContext} from 'react'
import FarmerInfo from './constants/FarmerContextProvider'

const Profile = {
    fullname: '',
    aboutYourself: '',
    email:'',
    phoneNumber:'',
    farmName:'',
    farm_address:'',
    home_Address:'',
    nationalId :''
}

const InitialProfileImage = localStorage.getItem('profileImage')
console.log(InitialProfileImage)
const FarmerProfile = () => {
    const [profile,setProfile] = useState(Profile)
    const [profileImg,setProfileImg] = useState('')
    const [proImg,setProImg] = useState(InitialProfileImage)
    const [initFarmerProfile,setInitFarmerProfile] = useState('')
    const [submit,setSubmit] = useState(false)
    const [initProfile,setInitProfile] = useState('data:image/png;base64,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')

const {userid} = useContext(FarmerInfo)

    console.log(initProfile)
    const handleProfile = (e) => {
        const {name, value} = e.target
        setProfile({...profile,[name]:value})
        console.log(profile)
    }

    const submitProfile = async (e) => {
        e.preventDefault();
      
        if (!profileImg) {
          alert("Please select your profile image before upload.");
          return;
        }
      
        const formData = new FormData();
        formData.append('proImage', profileImg); // Append the selected image
        formData.append('fullname', profile.fullname); // Append other profile data
        formData.append('email', profile.email);
        formData.append('phoneNumber', profile.phoneNumber);
        formData.append('farmName',profile.farmName)
        formData.append('home_Address',profile.home_Address)
        formData.append('nationalId',profile.nationalId)
        formData.append('aboutYourself',profile.aboutYourself)
        // Add more fields as needed
        const url = `http://localhost/farmerUser/profile?userId=${userid}`;
        try {
          const response = await fetch(url, {
            method: "POST",
            body: formData,
          });
      
          if (response.ok) {
            alert(" Profile has been uploaded successfully!");
            response.json()
            .then(data => {
              const ProfileImage = data.ProfileImage
              localStorage.setItem('profileImage',ProfileImage)
              console.log(data)
              setSubmit(!submit)
            })
            .catch(err => {
              console.error(err)
            })
          } else {
            alert("Image upload failed.");
            console.log("Response Status:", response.status);
            console.log("Response Status Text:", response.statusText);
          }
        } catch (error) {
          console.error("Error:", error);
        }
      };


    const captureProfileImg = (e) => {
        const file = e.target.files[0]
        const url = URL.createObjectURL(file)
        setProfileImg(file)
        setProImg(url)
    }

    console.log(profileImg)
  return (
    <>
    <h2>Profile</h2>
    <form onSubmit={submitProfile}>
        <main>
                <img src={ proImg? proImg : initProfile} width={150} height={150}  alt="" style={{
                    borderRadius: '50%'
                }} />
            <input type="file" onChange={captureProfileImg}/>
            <div>
                <input type="text" name='fullname' onChange={handleProfile} />
                <label htmlFor="fullname">Name</label>
            </div>
        </main>
        <h3>Your Info</h3>
        <main>
        <div>
            <input type="text" name='email' onChange={handleProfile} />
            <label htmlFor="email">Email</label>
        </div>
        <div>
            <input type="text" name='phoneNumber' onChange={handleProfile} />
            <label htmlFor="phoneNumber">phoneNumber</label>
        </div>
        <div>
            <input type="text" name='home_Address' onChange={handleProfile} />
            <label htmlFor="home_Address">home_Address</label>
        </div>
        <div>
            <input type="text" name='nationalId' onChange={handleProfile} />
            <label htmlFor="nationalId">nationalId</label>
        </div>
        </main>
        <h4>Your Farm Info</h4>
        <main>
        <div>
            <input type="text" name='farmName' onChange={handleProfile} />
            <label htmlFor="farmName">farmName</label>
        </div>
        <div>
            <input type="text"      value=''name='farm_address' onChange={handleProfile} />
            <label htmlFor="farm_address">farm_address</label>
        </div>
        </main>
        <div>
            <textarea name="aboutYourself" id="" cols="30" rows="10" onChange={handleProfile}></textarea>
            <label htmlFor="aboutYourself">Tell us About ourself</label>
        </div>
        <button>Update Profile</button>
    </form>
    </>
  )
}

export default FarmerProfile