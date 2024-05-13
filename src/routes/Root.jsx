import React from 'react'
import { Outlet } from 'react-router'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Home } from '.'
import { KProvider, Kactions, NavBar, SessionExpiredModal } from '../components'
import { useTranslation } from 'react-i18next'

const Root = () => {
  const navigateTo = useNavigate()
  const { t } = useTranslation('edventure')

  const isLogged = useSelector(state => state.user)
  const sessionExpired = useSelector(state => state.token === 'EXPIRED')

  const actions = Kactions.map(action => {
    return {
      id: action.id,
      name: t(action.name),
      shortcut: action.shortcut,
      keywords: action.keywords,
      perform: () => navigateTo(action.route)
    }
  })
  return (
    <KProvider actions={actions}>
      <NavBar />
      {sessionExpired && <SessionExpiredModal />}
      {isLogged && !sessionExpired ? <Outlet /> : <Home />}
    </KProvider>
  )
}
export default Root
