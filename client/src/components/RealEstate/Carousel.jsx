import React from 'react'


const url = 'http://localhost:9000'
const Carousel = ({images, swidth, sheight}) => {
  let i = 0
  return (
    <>
    {/* Carousel  */}
    <div id="carouselExampleCaptions" className="carousel slide relative" data-bs-ride="carousel">
      <div className="carousel-indicators absolute right-0 bottom-0 left-0 flex justify-center p-0 mb-4">
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="0"
          className="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
      </div>
      <div style={{width: swidth, height: sheight}} className={`carousel-inner relative overflow-hidden`}>
        {images && images.map((image) =>
          (image == images[0]) ?
          (
          <div key={image} className="carousel-item active relative float-left w-full">
            <img
              src={`${url}/images/${image}`}
              className="block w-full"
              alt="..."
            />
          </div>
          ) : (
            <div key={image} className="carousel-item relative float-left w-full">
            <img
              src={`${url}/images/${image}`}
              className="block w-full"
              alt="..."
            />
          </div>
          )
        )}
      </div>
    </div>
    {/* Carousel  */}
    </>
  )
}

export default Carousel