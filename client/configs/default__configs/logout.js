import Cookies from "universal-cookie";

const cookie = new Cookies()
export const Logout = async(socket,userData) => {
    try {
      console.log('logout')
      const {_id,isFarmer} = userData
       socket.emit('logout_Init',{_id,isFarmer})
       socket.on('logout_SequenceCompleted',async() => {
        await cookie.remove('_id',{path: '/'})
        await cookie.remove('isFarmer',{path: '/'})
        await cookie.remove('username',{path: '/'})
        window.location.replace('/')
       })
      } catch (error) {
        
      }
}
//