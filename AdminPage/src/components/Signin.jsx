import React , {useState, useEffect} from 'react'
import Dashboard from './Dashboard/Dashboard'
const initialAdminInfo = {
    username: '',
    email: '',
    password: '',
}


const Signin = () => {
    const [adminInfo,setAdminInfo] = useState (initialAdminInfo)
    const [showPass,setShowPass] = useState(true)
    const [loginSuccessful,setLoginSuccessful] = useState(false)
    const e = new Boolean(true)
    console.log(e)

    const showpass = () => {
        setShowPass((prevshowPass) => !showPass)
    }

    const adminLoginInfo = (e) => {
        const {name, value} = e.target
        setAdminInfo({...adminInfo,[name] : value})
    }

    const adminLogin = async() => {
        e.preventDefault();
        const {} = adminInfo
        const AdminLoginUrl = ''
        fetch(AdminLoginUrl,{
            method: 'Post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username, password,username}),
        })
        .then(response => {
            if(response.ok){
                
                sessionStorage.setItem('loginSuccess', 'true')
            }
            response.json()
            .then(data => {

            })
        })
    }
    if(loginSuccessful){
        return }
  return (
    <form onSubmit={adminLogin}>
        <div>
            <input type="text"  name='username' value={adminInfo.username} onChange={adminLoginInfo} />
            <label htmlFor="username">Username</label>
        </div>
        <div>
            <input type="text"  name='email' value={adminInfo.email} onChange={adminLoginInfo} />
            <label htmlFor="email">Email</label>
        </div>
        <section>
            <div>
            <input type={showPass ? 'password' : 'text'} name='password' value={adminInfo.password}  onChange={adminLoginInfo}/>
            <span onClick={showpass}>show</span>
            </div>
            <label htmlFor="email">Password</label>
        </section>
        <button>SignIN</button>
        </form>
  )
}

export default Signin