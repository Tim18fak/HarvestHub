import { rejects } from "assert";
import { resolve } from "path";
import Cookies from "universal-cookie";

const cookie = new Cookies()
const auth =  cookie.get('id')

export const getAllConsumer = async() => {
    const URL = `http://localhost/admin/allConsumer`
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
    const URL = ``
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