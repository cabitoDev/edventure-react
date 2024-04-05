import React from 'react'
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
  Avatar
} from '@nextui-org/react'
import { useDispatch, useSelector } from 'react-redux'
import { SearchIcon } from './SearchIcon'
import assets from '../../assets'
import { loginSuccess, logoutSuccess } from '../../redux/userSlice'
import { useNavigate } from 'react-router-dom'
import { Auth0Lock } from 'auth0-lock'
import { Constants } from '../../constants'

export const NavBar = () => {
  const { query } = useKBar()
  const user = useSelector(state => {
    console.log(state)
    return state.user
  })
  const navigateTo = useNavigate()
  const dispatch = useDispatch()
  const [lock, setLock] = React.useState()

  React.useEffect(() => {
    setLock(
      new Auth0Lock(
        window.location.origin.includes('myedventure.netlify.app')
          ? Constants.CLIENT_PRO
          : Constants.CLIENT_DEV,
        Constants.DOMAIN
      )
    )
  }, [])

  React.useEffect(() => {
    if (lock) {
      lock.on('authenticated', authResult => {
        lock.getUserInfo(authResult.accessToken, (error, profile) => {
          if (error) {
            console.error('Error al obtener el perfil de usuario:', error)
            return
          }
          dispatch(loginSuccess(profile))
          lock.hide()
          navigateTo('/profile')
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
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        {user.isAuthenticated && (
          <NavbarMenuToggle
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            className='sm:hidden'
          />
        )}
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
              navigateTo('/myEvents')
            }}
            color='foreground'
            className='hover:cursor-pointer'
          >
            Your events
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
        <SearchIcon className='hover:cursor-pointer' onClick={query.toggle} />
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
              <DropdownItem key='profile' onClick={() => {
              navigateTo('/profile')
            }}>Profile</DropdownItem>
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
          <NavbarMenuItem
            
          >
             <Link
                color="foreground"className='hover:cursor-pointer'onClick={() => {
                  navigateTo('/myEvents')
                }}>Your events</Link>
          </NavbarMenuItem>
          <NavbarMenuItem
           
          >
             <Link
                color="foreground"className='hover:cursor-pointer' onClick={() => {
                  navigateTo('/explore')
                }}>Explore events</Link>
          </NavbarMenuItem>
          <NavbarMenuItem
            
          >
             <Link
                color="foreground"className='hover:cursor-pointer'onClick={() => {
                  navigateTo('/create')
                }}>Create event</Link>
          </NavbarMenuItem>
          <NavbarMenuItem
           
          >
             <Link
                color="foreground"className='hover:cursor-pointer' onClick={() => {
                  navigateTo('/settings')
                }}>Settings</Link>
          </NavbarMenuItem>
          <NavbarMenuItem
            key='profile'
            
          >
             <Link
                color="foreground"className='hover:cursor-pointer'onClick={() => {
                  navigateTo('/profile')
                }}>Profile</Link>
          </NavbarMenuItem>
          {user && (
            <NavbarMenuItem key='logout'>
              <Link
                className='text-pink-600 hover:cursor-pointer'
                onClick={handleLogout}
              >
                Log Out
              </Link>
            </NavbarMenuItem>
          )}
        </NavbarMenu>
      )}
    </Navbar>
  )
}
