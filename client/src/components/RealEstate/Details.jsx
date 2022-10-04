import React, {useState, useEffect, useContext} from 'react'
import { useLocation, Link } from 'react-router-dom'
import Carousel from './Carousel'
import Navbar from './Navbar'
import { FaEnvelope, FaBed } from 'react-icons/fa'
import { HiPhone } from 'react-icons/hi'
import {TiTick} from 'react-icons/ti'
import { GiBathtub } from 'react-icons/gi'
import { BsBoundingBoxCircles } from 'react-icons/bs'
import {ImLocation} from 'react-icons/im'
import axios from 'axios'
import {AiFillEdit} from 'react-icons/ai'
import {MdDelete} from 'react-icons/md'
import { LoginContext } from './LoginContext'


const url = 'http://localhost:9000'
const Details = () => {
    const [post, setPost] = useState([])
    const [isUser, setIsUser] = useState(false)
    const id = useLocation()
    const path = id.pathname.split('/')[2]
    const {isLogin} = useContext(LoginContext)
    useEffect(()=>{
        const fetchPost = async () => {
            try{
                const res = await axios.get(`${url}/post/${path}`)
                if(res.data.email == localStorage.getItem('user')){
                    setIsUser(true)
                }
                setPost(res.data)
            }catch(error){
                console.log('Error 145: ', error)
            }
        }
        fetchPost()
    },[path])

    const handleDelete = async() => {
        try {
            await axios.delete(`${url}/delete/${path}`)
            window.location.replace('/realestate')
        } catch (error) {
            console.log(error.message)
        }
    }

    const {_id, title, desc, devName, devLogo, image, location, beds, baths, sqft, price, email, phone} = post
    return (
    <>
        <Navbar />
        <div className="mx-20 my-20">
            <h2 className='text-3xl mb-5'>{title}</h2>
            {isUser && (
                <div className="flex">
                    <Link to={`/edit/${_id}`}><button className='flex border-2 border-blue-300 text-blue-300 rounded text-sm mb-1 px-1 py-1'><AiFillEdit className='mr-2' /> Edit</button></Link>
                    <button onClick={handleDelete} className='flex border-2 border-red-300 text-red-300 rounded text-sm mb-1 ml-2 px-1 py-1'><MdDelete className='mr-2' /> Delete</button>
                </div>
            )}
            {post && (
            <>
            <div className="grid grid-cols-2">
                <Carousel images={image} swidth='100%' sheight='350px'/>
                <div className="flex justify-center">
                    <div className="rounded-lg shadow-lg bg-white w-7/12">
                        <a href="#!">
                            <img className="rounded-t-lg" src={`${url}/images/${devLogo}`} alt=""/>
                        </a>
                        <div className="p-6">
                            <h5 className="text-gray-900 text-xl font-medium mb-2">{devName}</h5>
                            <button className='flex w-full border-2 border-blue-600 text-blue-600 mr-2 mb-4 px-6 py-3'><FaEnvelope className='mr-2'/> Email {email}</button>
                            <button className='flex w-full bg-blue-600 text-white px-8 py-3'><HiPhone className='mr-2'/> Call {phone}</button>
                        </div>
                    </div>
                </div>
            </div>
            <p className='text-3xl mt-3 font-bold'>{price}</p>
            <div className="flex mt-3">
                <p className='flex text-gray-700 text-lg text-base mb-4 mr-3'><FaBed style={{color: '#000'}} className='mr-2'/> {beds} Beds</p>
                <p className='flex text-gray-700 text-lg text-base mb-4 mr-3'><GiBathtub style={{color: '#000'}} className='mr-2'/> {baths} Baths</p>
                <p className='flex text-gray-700 text-lg text-base mb-4 mr-3'><BsBoundingBoxCircles style={{color: '#000'}} className='mr-2'/> {sqft} Sqft</p>
            </div>
            <p className='text-gray-700 text-base mb-4 flex'><ImLocation className='mr-3'/> {location}</p>
            <div className="desc">
                <h3 className='text-xl'>{desc}</h3>
            </div>
            <h3 className='text-2xl mt-20'>Amenities</h3>
            <div className="flex justify-around mt-10">
                <p className='flex'><TiTick className='' /> Balcony</p>
                <p className='flex'><TiTick className='' /> Balcony</p>
                <p className='flex'><TiTick className='' /> Balcony</p>
                <p className='flex'><TiTick className='' /> Balcony</p>
                <p className='flex'><TiTick className='' /> Balcony</p>
            </div>
            </>
            )}
        </div>
    </>
    )
}

export default Details