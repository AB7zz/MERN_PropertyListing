import {
  Routes,
  Route,
  BrowserRouter,
} from 'react-router-dom'
import Home from './components/Home/Home'
import RealEstate from './components/RealEstate/RealEstate'
import Details from './components/RealEstate/Details'
import Upload from './components/RealEstate/Upload'
import Register from './components/RealEstate/Register'
import Login from './components/RealEstate/Login'
import Edit from './components/RealEstate/Edit'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/realestate" element={<RealEstate />}></Route>
          <Route path="/details/:id" element={<Details />}></Route>
          <Route path="/upload" element={<Upload />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/edit/:id" element={<Edit />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
