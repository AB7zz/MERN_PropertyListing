import React, {useState, useEffect} from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'


const url = 'http://localhost:9000'
const Edit = () => {
    const [newPost, setNewPost] = useState([])
    const id = useLocation()
    const path = id.pathname.split('/')[2]
    useEffect(()=>{
        const fetchPost = async () => {
            try{
                const res = await axios.get(`${url}/post/${path}`)
                if(res.data.email == localStorage.getItem('user')){
                    setNewPost(res.data)
                }else{
                    window.location.replace('/realestate')
                }
            }catch(error){
                console.log('Error 145: ', error)
            }
        }
        fetchPost()
    },[path])
    const {_id, title, desc, devName, devLogo, image, location, beds, baths, sqft, price, email, phone} = newPost
    console.log(newPost)
    const handleChange = (e) => {
        setNewPost((prevState) => ({
            ...prevState, [e.target.name]: e.target.value
        }))
    }
    const handleSubmit = async(e) => {
        e.preventDefault()
        console.log(newPost)
        try{
            const res = await axios.put(`${url}/edit/${path}`, newPost)
            window.location.replace('/details/'+res.data._id)
        }catch(error){
            console.log('Error 4523: ', error)
        }
    }
    return (
    <>
            {newPost && (
            <>
            <div>Update</div>
            <form className='grid' onSubmit={e => handleSubmit(e)}>
                <input value={title} className='border border-solid border-gray-300' type="text" name='title' onChange={e => handleChange(e)} />
                <textarea value={desc} name="desc" id="" cols="30" rows="10" onChange={e => handleChange(e)}></textarea>
                <input value={devName} placeholder='devName' className='border border-solid border-gray-300' type="text" name='devName' onChange={e => handleChange(e)} />
                {/* <input className='border border-solid border-gray-300' type="file" name="devLogo" id="" onChange={e => (handleChange(e), setDevLogo(e.target.files[0]))} />
                <input className='border border-solid border-gray-300' type="file" name="image1" id="" onChange={e => setProdImages(prevState => [...prevState, e.target.files[0]])} />
                <input className='border border-solid border-gray-300' type="file" name="image2" id="" onChange={e => setProdImages(prevState => [...prevState, e.target.files[0]])} />
                <input className='border border-solid border-gray-300' type="file" name="image3" id="" onChange={e => setProdImages(prevState => [...prevState, e.target.files[0]])} />
                <input className='border border-solid border-gray-300' type="file" name="image4" id="" onChange={e => setProdImages(prevState => [...prevState, e.target.files[0]])} />
                <input className='border border-solid border-gray-300' type="file" name="image5" id="" onChange={e => setProdImages(prevState => [...prevState, e.target.files[0]])} /> */}
                <select value={location} className='border border-solid border-gray-300' name="location" id="" onChange={e => handleChange(e)} >
                    <option value="Dubai">Dubai</option>
                    <option value="Sharjah">Sharjah</option>
                    <option value="Ajman">Ajman</option>
                    <option value="Abu Dhabi">Abu Dhabi</option>
                    <option value="Ras Al-Khaimah">Ras Al-Khaimah</option>
                    <option value="Umm Al Quwain">Umm Al Quwain</option>
                </select>
                <input value={beds} className='border border-solid border-gray-300' type="number" name="beds" id="" onChange={e => handleChange(e)} />
                <input value={baths} className='border border-solid border-gray-300' type="number" name="baths" id="" onChange={e => handleChange(e)} />
                <input value={sqft} className='border border-solid border-gray-300' type="number" name="sqft" id="" onChange={e => handleChange(e)} />
                <input value={price} className='border border-solid border-gray-300' type="text" name='price' onChange={e => handleChange(e)} />
                <input value={email} className='border border-solid border-gray-300' type="text" name='email' onChange={e => handleChange(e)} />
                <input value={phone} className='border border-solid border-gray-300' type="text" name='phone' onChange={e => handleChange(e)} />
                {/* <button className='py-3 px-20 bg-blue-300 text-white rounded' onClick={e => handleConfirm(e)}>Confirm</button> */}
                <button className='py-3 px-20 bg-blue-600 text-white rounded' type='submit'>Update</button>
            </form>
            </>
            )}
        </>
    )
}

export default Edit