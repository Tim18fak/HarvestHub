import Cookies from "universal-cookie";

const cookie = new Cookies()
export const Logout = async(socket,userData) => {
    try {
      const {_id,isFarmer} = userData
       socket.emit('logout_Init',{_id,isFarmer})
       socket.on('logout_SequenceCompleted',async() => {
        
       })
      } catch (error) {
        
      }
}
//