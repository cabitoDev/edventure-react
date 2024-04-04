import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Home } from './routes/Home.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './redux/store.js'
import { NextUIProvider } from '@nextui-org/react'
import { ThemeProvider } from 'next-themes'
import { Settings } from './routes/Settings.jsx'
import { KProvider } from './components/Kbar/KProvider.jsx'
import { Profile } from './routes/Profile.jsx'
import { CreateEvent } from './routes/CreateEvent.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/settings',
    element: <Settings />
  },
  {
    path: '/:user',
    element: <Profile />
  },
  {
    path: '/create',
    element: <CreateEvent />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <NextUIProvider>
    <ThemeProvider attribute='class' defaultTheme='dark'>
      <Provider store={store}>
        <KProvider>
          <RouterProvider router={router} />
        </KProvider>
      </Provider>
    </ThemeProvider>
  </NextUIProvider>
)
