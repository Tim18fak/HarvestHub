import Cookies from "universal-cookie";

const cookie = new Cookies()
const auth =  cookie.get('id')
const token = cookie.get('token')

export const getAllConsumer = async() => {
    const URL = `http://localhost/admin/allConsumer/${token}`
    return new Promise((resolve,reject) => {
        fetch(URL,{
            headers : {
                Authorization: `Bearer ${auth}`
            }
        })
        .then((response) => {
            if(!response){
                return console.error('Error')
            }
            response.json()
            .then(data => {
                resolve(data)
            })
            
        })
        .catch((err) => {
            console.error(err.message)
        })
    })
}

export const getFarmer = () => {
    const URL = `http://localhost/admin/allFarmer/${token}`
    return new Promise((resolve,reject) => {
        fetch(URL,{
            headers:{
                Authorization: `Bearer ${auth}`
            }
        })
        .then((res) => {
            if(!res.ok){
                throw new Error(``)
            }
            res.json()
            .then((data) => {
                resolve(data)
            })
        })
    })
}

export const getFarmerProduce = () => {

}