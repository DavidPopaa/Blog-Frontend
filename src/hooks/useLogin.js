import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {

    const [error,setError] = useState(null)
    const { dispatch } = useAuthContext()

    const login = async (username, password) => {
        setError(null)
        const response = await fetch("/api/user/login", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ username, password })
        })
        const json = await response.json()

        if(!response.ok) {
            setError(json.error)
        }

        if(response.ok) {
            localStorage.setItem('user', JSON.stringify(json))

            dispatch({ type: 'LOGIN', payload: json })
        }
    }

    return { login, error }
}
