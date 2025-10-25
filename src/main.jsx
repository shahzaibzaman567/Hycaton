import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Routes, Route, Navigate, Link, Outlet, useParams, useNavigate, useLocation } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>

<Route path='/' element={<App/>}/>

    </Routes>
    </BrowserRouter>
  </StrictMode>,
)
