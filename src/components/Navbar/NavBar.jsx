import React from 'react'
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
import { updateUser } from '../../redux/userSlice'
import { useNavigate } from 'react-router-dom'
import Constants from '../../constants'
import { httpPost } from '../../utils/httpUtils'
import { getLoginRequest } from '../../utils/utils'
import { lock, checkLogged } from '../../auth/auth-lock'
import KInput from '../Kbar/KInput'
import { profileOptions, userOptions } from './navBarOptions'
import NavBarDropdown from './NavBarDropdown'
import NavBarMenu from './NavBarMenu'

export const NavBar = () => {
  const user = useSelector(state => {
    return state.user
  })
  const navigateTo = useNavigate()
  const dispatch = useDispatch()

  lock.on('authenticated', authResult => {
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
  })
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
              {option.label}
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
