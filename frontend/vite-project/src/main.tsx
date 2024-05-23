import React from 'react'
import ReactDOM from 'react-dom/client'
import AppRoutes from './Router.tsx'
import 'rsuite/dist/rsuite.min.css';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
    <AppRoutes />
  // </React.StrictMode>
)
