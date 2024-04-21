import React, { useEffect } from 'react'
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  NavbarMenuToggle
} from '@nextui-org/react'
import { useDispatch, useSelector } from 'react-redux'
import assets from '../../assets'
import { updateUser } from '../../redux'
import { useNavigate } from 'react-router-dom'
import Constants from '../../constants'
import { getLoginRequest, httpPost } from '../../utils'
import { lock, checkLogged } from '../../auth/auth-lock'
import { NavBarMenu, NavBarDropdown } from '.'
import { KInput } from '../Kbar'
import { userOptions, profileOptions } from './navBarOptions'
import { useTranslation } from 'react-i18next'

const NavBar = () => {
  const user = useSelector(state => {
    return state.user
  })
  const { t } = useTranslation('edventure')
  const navigateTo = useNavigate()
  const dispatch = useDispatch()

  const handleAuthenticated = authResult => {
    lock.hide()
    lock.getUserInfo(authResult.accessToken, async (error, profile) => {
      if (error) {
        console.error('Error getting user:', error)
        return
      }
      const userLogged = await httpPost(
        Constants.USERS_ENDPOINT_URL,
        getLoginRequest(profile)
      )
      if (userLogged) {
        dispatch(updateUser(userLogged))
        navigateTo('/profile')
      } else {
        //handleError
      }
    })
  }

  useEffect(() => {
    lock.on('authenticated', handleAuthenticated)

    return () => {
      lock.off('authenticated', handleAuthenticated)
    }
  }, [])

  const [isMenuOpen, setIsMenuOpen] = React.useState(false)

  return (
    <Navbar isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        {user && <NavbarMenuToggle className='sm:hidden' />}
        <NavbarBrand>
          <img
            className='hover:cursor-pointer logo'
            src={assets.logo}
            onClick={() => navigateTo('/')}
          />
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className='hidden sm:flex gap-4' justify='center'>
        {userOptions.map((option, index) => (
          <NavbarItem key={index}>
            <Link
              onClick={() => {
                checkLogged(user)
                navigateTo(option.path)
              }}
              color='foreground'
              className='hover:cursor-pointer'
            >
              {t(option.label)}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent justify='end'>
        {user && (
          <>
            <KInput />
            <NavBarDropdown user={user} profileOptions={profileOptions} />
          </>
        )}
        {!user && (
          <NavbarItem key='signup'>
            <Link
              className='hover:cursor-pointer'
              color='primary'
              onClick={() => checkLogged(user)}
            >
              Sign Up
            </Link>
          </NavbarItem>
        )}
      </NavbarContent>
      {user && (
        <NavBarMenu userOptions={userOptions} setIsMenuOpen={setIsMenuOpen} />
      )}
    </Navbar>
  )
}
export default NavBar
