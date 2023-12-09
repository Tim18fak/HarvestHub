import { Axios } from "../default__configs/axios.config"

export const GetProfile = async(user) => {
  const url =  `http://localhost/farmerUser/fM/profile/${user._id}`
    const result = await Axios.get(url)
    return result.data
}

export const GetProduce = async (user) => {
    const url = `http://localhost/farmerUser/produce/${user._id}`;
  
    try {
      const response =  await Axios.get(url)
      return response.data
    } catch (error) {
      console.error('Error fetching produce:', error);
    }
  };

  export const DeleteProduce = async(...id) => {
    const url = `http://localhost/farmerUser/deleteProduce/${id[0]}/${id[1]}`
    const result = await Axios.delete(url)
    console.log(result.data)
    if(result.status === 204){
      return 200
    }
  }