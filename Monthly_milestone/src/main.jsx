import { StrictMode,lazy,Suspense} from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
const Confirmation=lazy(()=>import ('./Confirmation.jsx'));
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route path="/" element={<App />}/>
    <Route path="dashboard" element={<Suspense fallback={<div>Loading...</div>}><Confirmation/></Suspense>} />
    </>
  )
);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
