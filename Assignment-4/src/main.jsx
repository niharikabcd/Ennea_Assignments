import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { RouterProvider,Route,createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Layout from './Components/Layout.jsx'
import Home from './Components/Home.jsx'
import FitmeLip from './Components/FitmeLip.jsx'
import Foundation from './Components/Foundation.jsx'
import Blush from './Components/Blush.jsx'
import EyeShadow from './Components/EyeShadow.jsx'

const route=createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout/>}>
      <Route path='' element={<Home/>}/>
      <Route 
      path='fitmelip' element={<FitmeLip/>} />
      <Route path='Blush' element={<Blush/>} />
      <Route path='foundation' element={<Foundation/>} />
      <Route path='eyeshadow' element={<EyeShadow/>} />
      <Route path='*' element={<h1>Product Not Found</h1>}/>
      </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={route}/>
  </StrictMode>,
)
