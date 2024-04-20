import PropTypes from 'prop-types'
import { NavbarMenu, NavbarMenuItem, Link } from '@nextui-org/react'
import React from 'react'
import { useNavigate } from 'react-router'
import { useLogout } from '../../hooks'

const NavBarMenu = ({ userOptions, setIsMenuOpen }) => {
  const navigateTo = useNavigate()
  const logout = useLogout()
  return (
    <NavbarMenu>
      {userOptions.map((option, index) => (
        <NavbarMenuItem key={index}>
          <Link
            color='foreground'
            className='hover:cursor-pointer'
            onClick={() => {
              setIsMenuOpen(false)
              navigateTo(option.path)
            }}
          >
            {option.label}
          </Link>
        </NavbarMenuItem>
      ))}
      <NavbarMenuItem key='logout'>
        <Link className='text-pink-600 hover:cursor-pointer' onClick={logout}>
          Log Out
        </Link>
      </NavbarMenuItem>
    </NavbarMenu>
  )
}

NavBarMenu.propTypes = {
  setIsMenuOpen: PropTypes.func,
  userOptions: PropTypes.array
}
export default NavBarMenu
