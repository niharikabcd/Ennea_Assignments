import { StrictMode,lazy,Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
const AdminLogin=lazy(()=>import ('./Pages/AdminLogin.jsx'));
const Signup=lazy(()=>import ('./Pages/Signup.jsx'));
const Login=lazy(()=>import ('./Pages/Login.jsx'));
const StudentProfile=lazy(()=>import ('./Pages/StudentProfile.jsx'))
import Layout from './Components/Layout.jsx';
import CoursePage from './Pages/CoursePage.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const AdminCourses=lazy(()=> import  ('./Pages/AdminCourses.jsx'));

const queryClient = new QueryClient();
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout/>}>
      <Route path='' element={<QueryClientProvider client={queryClient}><CoursePage/></QueryClientProvider>}/>
      <Route path="admin_login" element={<Suspense fallback={<div>Loading...</div>}><AdminLogin/></Suspense>} />
      <Route path="s_signup" element={<Suspense fallback={<div>Loading...</div>}><Signup/></Suspense>} />
      <Route path="s_login" element={<Suspense fallback={<div>Loading...</div>}><Login/></Suspense>} />
      <Route path="studentprofile" element={<Suspense fallback={<div>Loading...</div>}><QueryClientProvider client={queryClient}><StudentProfile/></QueryClientProvider></Suspense>}/>
      <Route path="admincourses" element={<Suspense fallback={<div>Loading...</div>}><QueryClientProvider client={queryClient}><AdminCourses/></QueryClientProvider></Suspense>}/>
      <Route path='*' element={<h1>Page Not Found</h1>}/>
    </Route>
  )
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
