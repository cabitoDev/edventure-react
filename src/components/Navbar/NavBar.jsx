import React from 'react'
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
  Button,
  Input
} from '@nextui-org/react'
import './Navbar.css'
import { useAuth0 } from '@auth0/auth0-react'
import { useDispatch, useSelector } from 'react-redux'
import { SearchIcon } from './SearchIcon'
import assets from '../../assets'

export const NavBar = () => {
  const { logout } = useAuth0()
  // const dispatch = useDispatch();
  // const { isAuthenticated } = useSelector(
  //   (state) => state.user.isAuthenticated
  // );

  const handleLogout = () => {
    logout()
  }

  const user = useSelector(state => {
    console.log(state)
    return state.user
  })
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className='sm:hidden'
        />
        <NavbarBrand>
          <img src={assets.logo} />
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className='hidden sm:flex gap-4' justify='center'>
        <NavbarItem>
          <Link color='foreground' href='#'>
            Your events
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color='foreground' href='#'>
            Create event
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify='end'>
        <Input
          classNames={{
            base: 'max-w-full sm:max-w-[10rem] h-10',
            mainWrapper: 'h-full',
            input: 'text-small',
            inputWrapper:
              'h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20'
          }}
          placeholder='Search event...'
          size='sm'
          startContent={<SearchIcon size={18} />}
          type='search'
        />
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
            <DropdownItem href={`/${user.userInfo.nickname}/settings`}>
              Settings
            </DropdownItem>
            <DropdownItem key='profile'>Profile</DropdownItem>
            <DropdownItem key='logout' color='danger' onClick={handleLogout}>
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
      <NavbarMenu>
        <NavbarMenuItem>
          <Link href={`/${user.userInfo.nickname}`}>Your events</Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link href={`/${user.userInfo.nickname}/create`}>Create event</Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link href={`/${user.userInfo.nickname}/settings`}>Settings</Link>
        </NavbarMenuItem>
        <NavbarMenuItem key='profile'>
          <Link href={`/${user.userInfo.nickname}/profile`}>Profile</Link>
        </NavbarMenuItem>
        <NavbarMenuItem key='logout'>
          <Link href='/' color='danger' onClick={handleLogout}>
            Log Out
          </Link>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  )
}
