import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

const savedSettings =
  JSON.parse(localStorage.getItem('recallSettings')) || {}

const savedTheme = savedSettings.theme || 'Dark'

document.documentElement.setAttribute(
  'data-theme',
  savedTheme.toLowerCase(),
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)