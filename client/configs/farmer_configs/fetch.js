import { Axios } from "../default__configs/axios.config"

export const GetProfile = async(user) => {
   /*  const url  = `http://localhost/ ${id}`
    const result =  Axios.get('',{
        headers: {
            Authorization: ``
        }
    }) */
    console.log('hello')
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