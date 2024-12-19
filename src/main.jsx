import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AgeCalculator from './components/AgeCalculator.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AgeCalculator/>
  </StrictMode>,
)