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
import { Profile } from './routes/Profile.jsx'
import { CreateEvent } from './routes/CreateEvent.jsx'
import { Root } from './routes/Root.jsx'
import { UserEvents } from './routes/UserEvents.jsx'
import { Explore } from './routes/Explore.jsx'
import { getEventById, getEvents } from './utils/httpUtils.js'
import { Event } from './routes/Event.jsx'
import { initializeApp } from 'firebase/app'

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
        path: 'my-events',
        element: <UserEvents />
      },
      {
        path: 'explore',
        element: <Explore />,
        loader: getEvents
      },
      {
        path: 'event/:id',
        element: <Event />,
        loader: ({ params }) => getEventById(params.id)
      }
    ]
  }
])

const firebaseConfig = {
  apiKey: 'AIzaSyCwaUL9d_JkTlCXCbqTUg_QxJadd5M3DyA',
  authDomain: 'edventure-419614.firebaseapp.com',
  projectId: 'edventure-419614',
  storageBucket: 'edventure-419614.appspot.com',
  messagingSenderId: '503290416665',
  appId: '1:503290416665:web:5aa99b9f6e1e4f6c9fe488',
  measurementId: 'G-B8FM81390R'
}
initializeApp(firebaseConfig)

ReactDOM.createRoot(document.getElementById('root')).render(
  <NextUIProvider>
    <ThemeProvider attribute='class' defaultTheme='dark'>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ThemeProvider>
  </NextUIProvider>
)
