import React from 'react'
import { NavBar } from '../components/Navbar/NavBar'
import { Outlet, useLocation } from 'react-router'
import { useNavigate } from 'react-router-dom'

import { KProvider } from '../components/Kbar/KProvider'
import { Kactions } from '../components/Kbar/Kactions'
import { motion, AnimatePresence } from 'framer-motion'
import { useSelector } from 'react-redux'
import { Home } from './Home'

export const Root = () => {
  const location = useLocation()
  const navigateTo = useNavigate()
  const isAuthenticated = useSelector(state => state.user.isAuthenticated)

  const actions = Kactions.map(action => {
    return {
      id: action.id,
      name: action.name,
      shortcut: action.shortcut,
      keywords: action.keywords,
      perform: () => navigateTo(action.route)
    }
  })
  return (
    <motion.div
      className='gap-md flex-column'
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <KProvider actions={actions}>
        <NavBar />
        <motion.div
          key={location.pathname}
          className='gap-md flex-column'
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {isAuthenticated? <Outlet /> : <Home />}
        </motion.div>
      </KProvider>
    </motion.div>
  )
}
