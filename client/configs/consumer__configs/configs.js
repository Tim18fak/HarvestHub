import { Axios } from "../default__configs/axios.config"
import Cookies from "universal-cookie"

const cookie = new Cookies()

const getID = () => {
    return cookie.get('_id')
}
const getAccesToken =  () => {
    return cookie.get('accessToken')
}
export const GetFarmerInfo = async(id) => {
    console.log(id)
    const url = `http://localhost/client/p/${id}`
    const info = await Axios.get(url)
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
    const url = `http://localhost/client/gT/bmrK/${_id}`;

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
        return bookmark.bookmark;
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