import React, {useState} from 'react'
import axios from 'axios'

export const LoginContext = React.createContext()


const url = 'http://localhost:9000'
export const LoginContextProvider = ({children}) => {
    const [account, setAccount] = useState({email: '', password: ''})
    const [isLogin, setLogin] = useState(false)

    const handleChange = (e) => {
        setAccount((prevState) => ({
            ...prevState, [e.target.name] : e.target.value
        }))
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        try {
            const res = await axios.post(`${url}/login`, account)
            console.log(res.data.message)

            if(res.data.isLogin){
                setLogin(true)
                localStorage.setItem('user', account.email)
                window.location.replace('/realestate')
            } 
        } catch (error) {
            console.log('Error 2245: ', error.message)
        }
    }

    const handleLogOut = () => {
        setLogin(false)
        localStorage.removeItem('user')
        window.location.replace('/realestate')
        // location.reload()
    }
    return (
        <>
            <LoginContext.Provider value={{
                isLogin,
                setLogin,
                handleSubmit,
                handleChange,
                handleLogOut
            }}>
                {children}
            </LoginContext.Provider>
        </>
    )
}

// export default LoginContextProvider