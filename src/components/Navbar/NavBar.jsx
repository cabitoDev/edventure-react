import React from 'react'
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  NavbarMenuToggle
} from '@nextui-org/react'
import assets from '../../../public/assets'
import { useNavigate } from 'react-router-dom'

import { NavBarMenu, NavBarDropdown } from '.'
import { KInput } from '../Kbar'
import { userOptions, profileOptions } from './navBarOptions'
import { useTranslation } from 'react-i18next'
import useAuthentication from '../../hooks/useAuthentication'

const NavBar = () => {
  const { user, showLogin } = useAuthentication()
  const { t } = useTranslation('edventure')
  const navigateTo = useNavigate()

  const [isMenuOpen, setIsMenuOpen] = React.useState(false)

  return (
    <Navbar isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        {user && <NavbarMenuToggle className='sm:hidden' />}
        <NavbarBrand>
          <img
            data-testid='LOGO'
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
                if (!user) {
                  showLogin() // Mostrar login si el usuario no está autenticado
                }
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
              onClick={() => showLogin()} // Mostrar login al hacer clic en 'SIGN_UP'
            >
              {t('SIGN_UP')}
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
