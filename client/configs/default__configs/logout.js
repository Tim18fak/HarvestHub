import { Signout } from "./connect";
import { cookie } from "./cookies";

export const Logout = async() => {
    try {
        await cookie.remove('_id', { path: '/' });
        await cookie.remove('accessToken', { path: '/' });
        await cookie.remove('isFarmer', { path: '/' });
        await cookie.remove('username', { path: '/' });
    
        // Redirect after all cookies are removed
        window.location.replace('/');
      } catch (error) {
        
      }
}
//