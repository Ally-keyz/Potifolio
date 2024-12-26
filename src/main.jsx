import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { Route, Router, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import LayOut from './LayOut.jsx'
import Landing from './pages/Landing.jsx'
import Home from './pages/Home.jsx'
import Register from './pages/Register.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import './index.css'
import React from 'react'
import Content from './pages/Content.jsx'
import Projects from './pages/Projects.jsx'
import Turtorials from './pages/Turtorials.jsx'
import Render from './pages/Render.jsx'




const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<LayOut />}>
      <Route path="/" element={<Render />} />
      <Route path="/Projects" element={<Projects />}/>
      <Route path='/Register' element={<Register />} />
      <Route path='/Turtorials' element={<Turtorials />} />
      
      <Route path="/Home" element={<Content />}>
        <Route path='' element={<Home />} />   
      </Route>
    </Route>
  )
);


createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
