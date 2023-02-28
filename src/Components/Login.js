import { useState } from "react"
import { useLogin } from "../hooks/useLogin"
import { useLogout } from "../hooks/useLogout"
import '../css/Auth.css'

const Login = () => {
    const[username, setUsername] = useState('')
    const[password, setPassword] = useState('')
    const { login, error } = useLogin()
    const { logout } = useLogout()

    const handleLogOut = () => {
        logout()
    }
    const hadleLogin = async() => {
        await login(username, password)
    }

    return(
        <div className="auth-container">
            <div className="signup">Login</div>
            <input type="text" placeholder="username" className="input-auth" onChange={(e) => setUsername(e.target.value)}></input>
            <input type="text" placeholder="password" className="input-auth" onChange={(e) => setPassword(e.target.value)}></input>
            <input type="submit" className="input-auth" onClick={hadleLogin}/>
            {error && <div><h2>{error}</h2></div>}
            {/* <div><button onClick={handleLogOut}>Logout</button></div> */}
        </div>
    )
}

export default Login