import React, {useContext, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { LoginContext } from './LoginContext'

const Navbar = () => {
  const {isLogin, handleLogOut, setLogin} = useContext(LoginContext)
  useEffect(() => {
    if(localStorage.getItem('user')){
      setLogin(true)
    }
  }, [])
  return (
    <>
    {/* Navbar  */}
    <nav
  className="relative w-full flex flex-wrap items-center justify-between py-3 bg-gray-900 text-gray-200 shadow-lg navbar navbar-expand-lg navbar-light"
>
  <div className="container-fluid w-full flex flex-wrap items-center justify-between px-6">
    <button
      className="navbar-toggler text-gray-200 border-0 hover:shadow-none hover:no-underline py-2 px-2.5 bg-transparent focus:outline-none focus:ring-0 focus:shadow-none focus:no-underline"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarSupportedContent1"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <svg
        aria-hidden="true"
        focusable="false"
        data-prefix="fas"
        data-icon="bars"
        className="w-6"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
      >
        <path
          fill="currentColor"
          d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"
        ></path>
      </svg>
    </button>
    <div className="collapse navbar-collapse flex-grow items-center" id="navbarSupportedContent1">
      <Link className="text-xl text-white pr-2 font-semibold" to="/realestate">Real Estate</Link>
      <ul className="navbar-nav flex flex-col pl-0 list-style-none mr-auto">
        <li className="nav-item p-2">
          <a className="nav-link text-white" href="#">Properties</a>
        </li>
        <li className="nav-item p-2">
          <a
            className="nav-link text-white opacity-60 hover:opacity-80 focus:opacity-80 p-0"
            href="#"
            >Contact us</a>
        </li>
      </ul>
    </div>
    <div className="flex justify-end">
      {isLogin ? (
        <>
          <h2 className='text-xl'>{localStorage.getItem('user')}</h2>
          <button onClick={handleLogOut} className='text-white rounded bg-red-500 py-3 px-5 ml-5 mr-4'>Log Out</button>
          <Link to='/upload'><button className='text-white rounded bg-blue-600 py-3 px-5'>Upload</button></Link>
        </>
      ) : (
        <>
          <Link to='/register'><button className='text-white rounded bg-blue-300 py-3 px-5 mr-5'>Register</button></Link>
          <Link to='/login'><button className='text-white rounded bg-blue-600 py-3 px-5'>Login</button></Link>
        </>
      )}
    </div>
  </div>
</nav>
    {/* Navbar  */}
    </>
  )
}

export default Navbar