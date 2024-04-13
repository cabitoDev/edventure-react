import React from 'react'
import { NavBar } from '../components/Navbar/NavBar'
import { Outlet } from 'react-router'
import { useNavigate } from 'react-router-dom'

import { KProvider } from '../components/Kbar/KProvider'
import { Kactions } from '../components/Kbar/Kactions'
import { useSelector } from 'react-redux'
import { Home } from './Home'
import { TransitionAnimation } from '../components/TransitionAnimation'

export const Root = () => {
  const navigateTo = useNavigate()
  const isLogged = useSelector(state => state.user)

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
    <TransitionAnimation>
      <KProvider actions={actions}>
        <NavBar />
        <TransitionAnimation>
          {isLogged ? <Outlet /> : <Home />}
        </TransitionAnimation>
      </KProvider>
    </TransitionAnimation>
  )
}
