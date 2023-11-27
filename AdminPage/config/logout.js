import Cookies from "universal-cookie"


const cookie = new Cookies()

export const Logout = ()=> {
    cookie.remove('id');
    cookie.remove('adminAuthToken');
    cookie.remove('token');
    window.location.replace('/')
}

