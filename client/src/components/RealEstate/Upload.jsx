import React, {useState, useEffect, useContext} from 'react'
import axios from 'axios'
import { LoginContext } from './LoginContext'


const url = 'http://localhost:9000'
const Upload = () => {
    const {isLogin} = useContext(LoginContext)
    useEffect(() => {
        if(!isLogin){
            window.location.replace('/realestate')
        }
    }, [])
    const [devLogo, setDevLogo] = useState(null)
    const [prodImages, setProdImages] = useState([])
    const [post, setPost] = useState({
        title: '',
        desc: '',
        devName: '',
        devLogo: '',
        image: [],
        location: '',
        beds: '',
        baths: '',
        sqft: '',
        price: '',
        email: localStorage.getItem('user'),
        phone: ''
    })
    const handleChange = (e) => {
        setPost((prevState) => ({
            ...prevState, [e.target.name]: e.target.value
        }))
    }

    const handleConfirm = async (e) => {
        e.preventDefault()
        if(devLogo){
            const data = new FormData()
            const filename = Date.now() + devLogo.name
            data.append('name', filename)
            data.append('file',devLogo)
            post.devLogo = filename
            try{
                await axios.post(`${url}/devImgUpload`, data)
            }catch(error){
                console.log('Error 69: ', error)
            }
        }
        if(prodImages){
            console.log(prodImages)
            let data1, filename1
            for(let i=0; i<prodImages.length; i++){
                data1 = new FormData()
                filename1 = Date.now() + prodImages[i].name
                data1.append('name',filename1)
                data1.append('file', prodImages[i])
                setPost((prevState) => ({
                    ...prevState, image : [...prevState.image, filename1]
                }))
                try{
                    await axios.post(`${url}/devImgUpload`, data1)
                }catch(error){
                    console.log('Error 69: ', error)
                }
            }
            
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(post)
        try{
            const res = await axios.post(`${url}/post`, post)
            window.location.replace('/details/'+res.data._id)
        }catch(error){
            console.log('Error 420: ', error)
        }
    }
    return (
        <>
            <div>Upload</div>
            <form className='grid' onSubmit={e => handleSubmit(e)}>
                <input placeholder='title' className='border border-solid border-gray-300' type="text" name='title' onChange={e => handleChange(e)} />
                <textarea placeholder='desc' name="desc" id="" cols="30" rows="10" onChange={e => handleChange(e)}></textarea>
                <input placeholder='devName' className='border border-solid border-gray-300' type="text" name='devName' onChange={e => handleChange(e)} />
                <input className='border border-solid border-gray-300' type="file" name="devLogo" id="" onChange={e => (handleChange(e), setDevLogo(e.target.files[0]))} />
                <input className='border border-solid border-gray-300' type="file" name="image1" id="" onChange={e => setProdImages(prevState => [...prevState, e.target.files[0]])} />
                <input className='border border-solid border-gray-300' type="file" name="image2" id="" onChange={e => setProdImages(prevState => [...prevState, e.target.files[0]])} />
                <input className='border border-solid border-gray-300' type="file" name="image3" id="" onChange={e => setProdImages(prevState => [...prevState, e.target.files[0]])} />
                <input className='border border-solid border-gray-300' type="file" name="image4" id="" onChange={e => setProdImages(prevState => [...prevState, e.target.files[0]])} />
                <input className='border border-solid border-gray-300' type="file" name="image5" id="" onChange={e => setProdImages(prevState => [...prevState, e.target.files[0]])} />
                <select className='border border-solid border-gray-300' name="location" id="" onChange={e => handleChange(e)} >
                    <option value="">--Selection Location--</option>
                    <option value="Dubai">Dubai</option>
                    <option value="Sharjah">Sharjah</option>
                    <option value="Ajman">Ajman</option>
                    <option value="Abu Dhabi">Abu Dhabi</option>
                    <option value="Ras Al-Khaimah">Ras Al-Khaimah</option>
                    <option value="Umm Al Quwain">Umm Al Quwain</option>
                </select>
                <input placeholder='Beds' className='border border-solid border-gray-300' type="number" name="beds" id="" onChange={e => handleChange(e)} />
                <input placeholder='Baths' className='border border-solid border-gray-300' type="number" name="baths" id="" onChange={e => handleChange(e)} />
                <input placeholder='Sqft' className='border border-solid border-gray-300' type="number" name="sqft" id="" onChange={e => handleChange(e)} />
                <input placeholder='Price' className='border border-solid border-gray-300' type="text" name='price' onChange={e => handleChange(e)} />
                <input placeholder='Phone' className='border border-solid border-gray-300' type="text" name='phone' onChange={e => handleChange(e)} />
                <button className='py-3 px-20 bg-blue-300 text-white rounded' onClick={e => handleConfirm(e)}>Confirm</button>
                <button className='py-3 px-20 bg-blue-600 text-white rounded' type='submit'>Post</button>
            </form>
        </>
    )
}

export default Upload