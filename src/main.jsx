// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import { RouterProvider } from "react-router/dom";
// import './index.css'
// import App from './App.jsx'
// import { router } from './Routes/router.jsx';

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <RouterProvider router={router} />,
//   </StrictMode>,
// )


import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from "react-router-dom";
import './index.css';
import { router } from './Routes/router.jsx';
import AuthProvider from './context/AuthProvider';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
        <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
