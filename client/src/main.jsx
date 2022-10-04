import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './style.css'
import {LoginContextProvider} from './components/RealEstate/LoginContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <LoginContextProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </LoginContextProvider>
)
