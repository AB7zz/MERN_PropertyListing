import React, {useState, useEffect} from 'react'
import { FaEnvelope, FaBed, } from 'react-icons/fa';
import { HiPhone } from 'react-icons/hi';
import {GiBathtub} from 'react-icons/gi'
import {BsBoundingBoxCircles} from 'react-icons/bs'
import {Link, useLocation} from 'react-router-dom'
import { ImLocation } from 'react-icons/im';
import axios from 'axios'



export const Card = ({id, img, title, price, beds, baths, sqft}) => {
    return (
        <div key={id} className="flex flex-col md:flex-row md:max-w-screen-xl w-screen rounded-lg bg-white shadow-2xl my-20">
            <img src={img} alt="property" className='w-72 h-96 md:h-auto object-cover rounded-t-lg md:rounded-none md:rounded-l-lg' />
            <div className="p-6 flex flex-col justify-start">
                <Link to={`/details/${id}`} className='text-gray-900 text-xl font-medium mb-2'>{title}</Link>
                <p className='text-gray-600 text-xl'>{price}</p>
                <p className='text-gray-700 text-sm mt-2 mb-4'>Uploaded 3min ago</p>
                <div className="flex">
                    <p className='flex text-gray-700 text-base mb-4 mr-3'><FaBed style={{color: '#000'}} className='mr-2'/> {beds} Beds</p>
                    <p className='flex text-gray-700 text-base mb-4 mr-3'><GiBathtub style={{color: '#000'}} className='mr-2'/> {baths} Baths</p>
                    <p className='flex text-gray-700 text-base mb-4 mr-3'><BsBoundingBoxCircles style={{color: '#000'}} className='mr-2'/> {sqft} Sqft</p>
                </div>
                <p className='text-gray-700 text-base mb-4 flex'><ImLocation className='mr-3'/> Dubai, UAE</p>
                <div className="flex">
                    <button className='flex border-2 border-blue-600 text-blue-600 mr-2 px-6 py-3'><FaEnvelope className='mr-2'/> Email</button>
                    <button className='flex bg-blue-600 text-white px-8 py-3'><HiPhone className='mr-2'/> Call</button>
                </div>
            </div>
        </div>
    )
}

const url = 'http://localhost:9000'


const Featured = () => {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        const fetchPosts = async () => {
            try{
                const res = await axios.get(`${url}/post`)
                setPosts(res.data)
            }catch(error){
                console.log('Error 563: ', error.message)
            }
        } 
        fetchPosts()
    }, [])
    return (
        <>
        <h1 className='text-center text-4xl my-20'>Featured</h1>
        <div className="block my-5 px-28">
            {posts && posts.map(data => (
                <Card 
                    id={data._id}
                    img={`${url}/images/${data.image[0]}`}
                    title={data.title}
                    price={data.price}
                    beds={data.beds}
                    baths={data.baths}
                    sqft={data.sqft}
                />
            ))}
            {/* <Card 
                img="https://loveincorporated.blob.core.windows.net/contentimages/gallery/7a882cbd-dd7c-4770-97dd-9c4f20fabadf-7-the-heart-of-europe-dubai-mansions-and-suites-deluxe-accommodation.jpg"
                title="5BHK Mansion Available for Sale in Downtown, Dubai"
                price="AED 4,000,000"
                beds="3"
                baths="6"
                sqft="8,411"
            /> */}
        </div>
        </>
    )
}

export default Featured