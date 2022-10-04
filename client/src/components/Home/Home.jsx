import {
  Link
} from 'react-router-dom'


const index = () => {
  return (
    <>
      <h2 className="text-4xl text-center">MERN Stack Real Estate Propert Listing Platform</h2>
      <div className="flex justify-around my-20">
        <Link className='' to="/realestate">Real Estate</Link>
        <Link className='' to="/realestate">Real Estate</Link>
        <Link className='' to="/realestate">Real Estate</Link>
      </div>
    </>
  )
}

export default index