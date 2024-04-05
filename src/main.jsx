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
import { Root } from './routes/Root.jsx'
import { UserEvents } from './routes/UserEvents.jsx'
import { Explore } from './routes/Explore.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        index: '/',
        element: <Home />
      },
      {
        path: 'settings',
        element: <Settings />
      },
      {
        path: 'create',
        element: <CreateEvent />
      },
      {
        path: 'profile',
        element: <Profile />
      },
      {
        path: 'yourEvents',
        element: <UserEvents />
      },
      {
        path: 'explore',
        element: <Explore />
      },
    ]
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
