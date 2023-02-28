import { useState } from "react"
import { useSignup } from "../hooks/useSignup"
import '../css/Auth.css'

const Signup = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const { signup, error } = useSignup()

    const hadleSignup = async () => {
        await signup(username, password)
    }
    if (error) {
        console.log("ERROR")
    }

    return (
        <div className="auth-container">
            <div className="signup">SignUp</div>
            <input type="text" placeholder="username" className="input-auth" onChange={(e) => setUsername(e.target.value)}></input>
            <input type="text" placeholder="password" className="input-auth" onChange={(e) => setPassword(e.target.value)}></input>
            <input type="submit" className="input-auth" onClick={hadleSignup} />
            {error && <div ><h2>{error}</h2></div>}
        </div>
    )
}

export default Signup