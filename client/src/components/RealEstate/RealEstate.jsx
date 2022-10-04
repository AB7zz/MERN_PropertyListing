import React from 'react'
import 'tw-elements'
import Navbar from './Navbar'
import Carousel from './Carousel'
import Featured from './Featured'

const index = () => {
  const images = ['photo-1512453979798-5ea266f8880c.jpg', '222684.jpg', '222761.jpg']
  
  return (
    <>
      <Navbar />
      <Carousel images = {images} swidth='100%'/>
      <Featured />
    </>
  )
}

export default index