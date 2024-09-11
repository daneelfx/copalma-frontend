import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import { Link } from 'react-router-dom'
import { MantineProvider } from '@mantine/core'
import PollinationMap from './pages/PollinationMap'

import Header from './components/Header'
import Login from './pages/Login.jsx'

import '@mantine/core/styles.css'
import '@mantine/dates/styles.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/map',
    element: (
      <MantineProvider>
        <PollinationMap />
      </MantineProvider>
    ),
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
