import { Axios } from "../default__configs/axios.config"
import Cookies from "universal-cookie"
import { newUrl } from "../../data/default/data"
const cookie = new Cookies()

const getID = () => {
    return cookie.get('_id')
}
const getAccesToken =  () => {
    return cookie.get('accessToken')
}
export const GetFarmerInfo = async(id) => {
    const url = `https://harvest-hub-pi.vercel.app/client/p/${id}`
    const info = await Axios.get(url)
    console.log(info)
    return info.data
}

export const Bookmark  = async(id) => {
    const Id = await getID();
    const token = await getAccesToken();
    const url = `http://localhost/client/bmrK/${Id}/${id}`;

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                authorization: `Bearer ${token}`,
            },
        });

       /*  if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        } */
        const data = await response.json();
        console.log(data);
        return data.message;
    } catch (error) {
        console.error('Error:', error.message);
        return error.message;
    }
};
export const getBookmark = async(userInfo) => {
    const { _id, accessToken } = userInfo;
    const url = `https://harvest-hub-pi.vercel.app/client/gT/bmrK/${_id}`;

    try {
        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const bookmark = await response.json();
        console.log(bookmark.bookmark)
        return bookmark.bookmark.filter((value) => value !== null)
        
    } catch (error) {
        console.error('Error:', error.message);
        throw error; // Re-throw the error so it can be caught by the calling function
    }
}
export const deleteBookMrk = (userInfo, id) => {
    const { _id, accessToken } = userInfo;
    const url = `http://localhost/client/uP/bmrk/${_id}/${id}`;

    return fetch(url, {
        method: 'PUT',
        headers: {
            authorization: `Bearer ${accessToken}`,
        },
    })
        .then(async (response) => {
            const res = await response.json();
            console.log(res.message);
            return res.message;
        })
        .catch((error) => {
            console.error('Error:', error.message);
            throw error;
        });
};

export const consumerNotification = (data) => {
    const {_id,accessToken} = data
}
export const ReviewProduce = async(produce,userData,review) => {
    try {
        console.log(produce,userData,review)
        const {Image,description,title,username} = produce;
        const {fullname} = userData
        const url =  `http://localhost/client/review/${produce._id}/${userData._id}`
        /* const result =  await Axios.post(url,{
            Image,
            description,
            title,
            username,
            fullname,
            review
        },{
            headers: {
                Authorization: `Bearer ${userData.accessToken}`
            }
        }) */
      const result = await fetch(url,{
            method: "POST",
            headers: {
                 Authorization: `Bearer ${userData.accessToken}`,
        'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Image,
            description,
            title,
            username,
            fullname,
            review
            })
        })
        const status =  result.status
        const message =  await result.json()
        console.log(message,status)
        return {status,message};
    } catch (error) {
        
    }
   
}