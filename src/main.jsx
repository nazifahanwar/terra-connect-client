import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import MainLayout from './Layouts/MainLayout.jsx'
import { RouterProvider } from 'react-router'
import { router } from './Routes/Routes.jsx'
import AuthProvider from './AuthContext/AuthProvider.jsx'
import { Toaster } from 'sonner'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider><RouterProvider router={router}><MainLayout/>
</RouterProvider><Toaster position='top-center'/></AuthProvider>
  </StrictMode>,
)
