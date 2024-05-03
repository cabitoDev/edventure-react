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
import { useTranslation } from 'react-i18next'

const NavBarDropdown = ({ user, profileOptions }) => {
  const navigateTo = useNavigate()
  const logout = useLogout()
  const { t } = useTranslation('edventure')

  return (
    <Dropdown placement='bottom-end'>
      <DropdownTrigger>
        <User
          data-testid='NAVBAR_AVATAR'
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
        {profileOptions.map(option => (
          <DropdownItem
            key={option.label}
            textValue={t(option.label)}
            onClick={() => {
              navigateTo(option.path)
            }}
          >
            {t(option.label)}
          </DropdownItem>
        ))}
        <DropdownItem onClick={logout}>
          <p className='text-pink-600' key='logout'>
            {t('LOGOUT')}
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
