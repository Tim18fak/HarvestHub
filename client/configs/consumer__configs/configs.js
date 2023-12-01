import { Axios } from "../default__configs/axios.config"
import Cookies from "universal-cookie"

const cookie = new Cookies()

const getID = () => {
    return cookie.get('_id')
}

export const GetFarmerInfo = async(id) => {
    console.log(id)
    const url = `http://localhost/client/p/${id}`
    const info = await Axios.get(url)
    return info.data
}

export const Bookmark  = async(id) => {
    const Id = await getID()

}