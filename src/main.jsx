import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Grafico, GraficoTemperatura } from "./Grafico";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <Grafico />
    <GraficoTemperatura />
  </StrictMode>,
)
