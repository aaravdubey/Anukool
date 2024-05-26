import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { transitions, positions, Provider as AlertProvider } from 'react-alert'

const options = {
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: '30px',
  transition: transitions.FADE
}

const AlertTemplate = ({ style, options, message, close }) => (
  <div className='alert-box shadow-lg'  >
    {message}
    <button onClick={close} style={{ fontSize: 'small' }}>&#10006;</button>
  </div>
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AlertProvider template={AlertTemplate} {...options}>
      <App />
    </AlertProvider>
  </React.StrictMode>,
)
