import PropTypes from 'prop-types'
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  User
} from '@nextui-org/react'
import React from 'react'
import { useNavigate } from 'react-router'
import { useLogout } from '../../hooks'

const NavBarDropdown = ({ user, profileOptions }) => {
  const navigateTo = useNavigate()
  const logout = useLogout()

  return (
    <Dropdown placement='bottom-end'>
      <DropdownTrigger>
        <User
          as='button'
          className='transition-transform'
          color='secondary'
          size='sm'
          avatarProps={{
            src: user.avatar
          }}
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
  profileOptions: PropTypes.array,
  user: PropTypes.object
}
export default NavBarDropdown
