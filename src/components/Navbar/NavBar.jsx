import React, { useEffect } from 'react'
import { useKBar } from 'kbar'
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  NavbarMenuToggle,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
  Input,
  Kbd
} from '@nextui-org/react'
import { useDispatch, useSelector } from 'react-redux'
import { SearchIcon } from './SearchIcon'
import assets from '../../assets'
import { loginSuccess, logoutSuccess } from '../../redux/userSlice'
import { useNavigate } from 'react-router-dom'
import { Auth0Lock } from 'auth0-lock'
import { Constants } from '../../constants'
import { postUserInfo } from '../../utils/httpUtils'

export const NavBar = () => {
  const { query } = useKBar()
  const user = useSelector(state => {
    console.log(state)
    return state.user
  })
  const navigateTo = useNavigate()
  const dispatch = useDispatch()
  const [lock, setLock] = React.useState()

  useEffect(() => {
    setLock(
      new Auth0Lock(
        window.location.origin.includes('edventure-six.vercel.app')
          ? Constants.CLIENT_PRO
          : Constants.CLIENT_DEV,
        Constants.DOMAIN
      )
    )
  }, [])

  useEffect(() => {
    if (lock) {
      lock.on('authenticated', authResult => {
        lock.getUserInfo(authResult.accessToken, (error, profile) => {
          if (error) {
            console.error('Error al obtener el perfil de usuario:', error)
            return
          }
          postUserInfo(profile)
            .then(userLogged => {
              dispatch(loginSuccess(userLogged))
              navigateTo('/profile')
            })
            .catch(() => {
              //handleError
            })

          lock.hide()
        })
      })
    }
  }, [lock])

  const handleLogout = () => {
    navigateTo('/')
    dispatch(logoutSuccess())
  }

  const showAuth0 = () => {
    lock.show()
  }

  const [isMenuOpen, setIsMenuOpen] = React.useState(false)

  return (
    <Navbar isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        {user.isAuthenticated && <NavbarMenuToggle className='sm:hidden' />}
        <NavbarBrand>
          <img
            className='hover:cursor-pointer logo'
            src={assets.logo}
            onClick={() => {
              navigateTo('/')
            }}
          />
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className='hidden sm:flex gap-4' justify='center'>
        <NavbarItem>
          <Link
            onClick={() => {
              navigateTo('/my-events')
            }}
            color='foreground'
            className='hover:cursor-pointer'
          >
            My events
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            onClick={() => {
              navigateTo('/explore')
            }}
            color='foreground'
            className='hover:cursor-pointer'
          >
            Explore events
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            onClick={() => {
              navigateTo('/create')
            }}
            color='foreground'
            className='hover:cursor-pointer'
          >
            Create event
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify='end'>
        <div onClick={query.toggle}>
          <Input
            className='w-min'
            startContent={
              <div className='flex gap-1'>
                <SearchIcon />
                <Kbd>Ctrl</Kbd>
                <Kbd>K</Kbd>
              </div>
            }
          />
        </div>

        {!user.isAuthenticated && lock && (
          <NavbarItem key='signup'>
            <Link
              className='hover:cursor-pointer'
              color='primary'
              onClick={showAuth0}
            >
              Sign Up
            </Link>
          </NavbarItem>
        )}
        {user.isAuthenticated && (
          <Dropdown placement='bottom-end'>
            <DropdownTrigger>
              <Avatar
                as='button'
                className='transition-transform'
                color='secondary'
                size='sm'
                src={user.userInfo.picture}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label='Profile Actions' variant='flat'>
              <DropdownItem
                onClick={() => {
                  navigateTo('/settings')
                }}
              >
                Settings
              </DropdownItem>
              <DropdownItem
                key='profile'
                onClick={() => {
                  navigateTo('/profile')
                }}
              >
                Profile
              </DropdownItem>
              <DropdownItem onClick={handleLogout}>
                <p className='text-pink-600' key='logout'>
                  Log Out
                </p>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        )}
      </NavbarContent>
      {user.isAuthenticated && (
        <NavbarMenu>
          <NavbarMenuItem>
            <Link
              color='foreground'
              className='hover:cursor-pointer'
              onClick={() => {
                setIsMenuOpen(false)
                navigateTo('/my-events')
              }}
            >
              My events
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <Link
              color='foreground'
              className='hover:cursor-pointer'
              onClick={() => {
                setIsMenuOpen(false)
                navigateTo('/explore')
              }}
            >
              Explore events
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <Link
              color='foreground'
              className='hover:cursor-pointer'
              onClick={() => {
                setIsMenuOpen(false)
                navigateTo('/create')
              }}
            >
              Create event
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <Link
              color='foreground'
              className='hover:cursor-pointer'
              onClick={() => {
                setIsMenuOpen(false)
                navigateTo('/settings')
              }}
            >
              Settings
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem key='profile'>
            <Link
              color='foreground'
              className='hover:cursor-pointer'
              onClick={() => {
                setIsMenuOpen(false)
                navigateTo('/profile')
              }}
            >
              Profile
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem key='logout'>
            <Link
              className='text-pink-600 hover:cursor-pointer'
              onClick={handleLogout}
            >
              Log Out
            </Link>
          </NavbarMenuItem>
        </NavbarMenu>
      )}
    </Navbar>
  )
}
