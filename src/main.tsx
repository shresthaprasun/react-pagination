import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { PaginationProvider } from './pagination-context'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <PaginationProvider>
    <App />
    </PaginationProvider>
  </React.StrictMode>,
)
