import PropTypes from 'prop-types'
import { Avatar } from '@nextui-org/avatar'
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger
} from '@nextui-org/dropdown'
import React from 'react'
import { useNavigate } from 'react-router'
import { useLogout } from '../../hooks/useLogout'
const NavBarDropdown = ({ user, profileOptions }) => {
  const navigateTo = useNavigate()
  const logout = useLogout()

  return (
    <Dropdown placement='bottom-end'>
      <DropdownTrigger>
        <Avatar
          as='button'
          className='transition-transform'
          color='secondary'
          size='sm'
          src={user.avatar}
        />
      </DropdownTrigger>
      <DropdownMenu aria-label='Profile Actions' variant='flat'>
        {profileOptions.map((option, index) => (
          <DropdownItem
            key={index}
            textValue={option.label}
            onClick={() => {
              navigateTo(option.path)
            }}
          >
            {option.label}
          </DropdownItem>
        ))}
        <DropdownItem textValue='Log Out' onClick={logout}>
          <p className='text-pink-600' key='logout'>
            Log Out
          </p>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}

NavBarDropdown.propTypes = {
  profileOptions: PropTypes.shape({
    map: PropTypes.func
  }),
  user: PropTypes.shape({
    avatar: PropTypes.any
  })
}
export default NavBarDropdown
