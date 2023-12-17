import Cookies from "universal-cookie"


const cookie = new Cookies()

export const Logout = async(socket)=> {
    const token= await cookie.get('token')
    console.log(socket)
    const id =  await cookie.get('id')
   socket.emit('adminLogoutInitialization',{token,id})
   socket.on('adminLogoutCompleted',async() => {
    await cookie.remove('adminAuthToken', { path: '/' });
      await cookie.remove('id', { path: '/' });
      await cookie.remove('token', { path: '/' });
      await cookie.remove('activeFarmer', { path: '/' });
      await cookie.remove('activeConsumer', { path: '/' });

      // Use window.location.href to navigate to the home page
      window.location.href = '/';
   })
}

