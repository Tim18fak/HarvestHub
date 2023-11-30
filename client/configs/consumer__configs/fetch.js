import { Axios } from "../default__configs/axios.config"

export const GetFarmerInfo = async(id) => {
    console.log(id)
    const url = `http://localhost/client//p/${id}`
    const info = await Axios.get(url)
    return info.data
}