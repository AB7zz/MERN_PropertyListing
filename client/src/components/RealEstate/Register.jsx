import axios from 'axios'
import React, {useState} from 'react'
import Navbar from './Navbar'


const url = 'http://localhost:9000'
const Register = () => {
    const [account, setAccount] = useState({email: '', password: ''})

    const handleChange = (e) => {
        setAccount((prevState) => ({
            ...prevState, [e.target.name] : e.target.value
        }))
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        try {
            await axios.post(`${url}/register`, account)
            window.location.replace('/realestate')
        } catch (error) {
            console.log('Error 2145: ', error.message)
        }
    }
    return (
    <>
        <Navbar />
        <h3 className='text-3xl text-center my-30'>Register</h3>
        <div className="w-full">
            <div className="rounded-lg shadow lg bg-white p-12">
                <form onSubmit={handleSubmit} className='grid justify-self-center ' action="">
                    <input onChange={handleChange} name='email' className='my-10 border-2 border-solid rounded border-blue-300 py-2 px-2' type="text" placeholder='Enter your Email' />
                    <input onChange={handleChange} name='password' className='border-2 border-solid rounded border-blue-300 py-2 px-2' type="password" placeholder='Enter Password' />
                    <button type='submit' className='my-10 bg-blue-600 text-white py-2 py-3'>Register</button>
                </form>
            </div>
        </div>
    </>

  )
}

export default Register