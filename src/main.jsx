import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { createHashRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import { Link } from 'react-router-dom'
import { MantineProvider } from '@mantine/core'
import PollinationMap from './pages/PollinationMap.jsx'
import PollinationLines from './pages/PollinationLines'

import Header from './components/Header'
import Login from './pages/Login.jsx'

import '@mantine/core/styles.css'
import '@mantine/dates/styles.css'

const router = createHashRouter([
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
  {
    path: '/lines',
    element: (
      <MantineProvider>
        <PollinationLines />
      </MantineProvider>
    ),
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
