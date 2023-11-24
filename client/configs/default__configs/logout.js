import Cookies from "universal-cookie";

const cookie = new Cookies()
export const Logout = () => {
    cookie.remove('_id');
    cookie.remove('accessToken');
    cookie.remove('isFarmer');
    cookie.remove('username')
    window.location.replace('/')
}