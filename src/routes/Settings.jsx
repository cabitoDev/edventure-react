import { useTheme } from 'next-themes'
import React, { useState } from 'react'
import { Button, Switch } from '@nextui-org/react'
import { SunIcon, MoonIcon, TransitionAnimation } from '../components'
import { useLogout, useUpdateUser } from '../hooks'
import { useSelector } from 'react-redux'

const Settings = () => {
  const { theme, setTheme } = useTheme()
  const logout = useLogout()
  const user = useSelector(state => state.user)
  const { updateUserAsync } = useUpdateUser()
  const [showEmail, setShowEmail] = useState(user.showEmail)

  return (
    <TransitionAnimation className='flex-column center gap-4'>
      <p className='text-2xl align-start pb-5'>Settings:</p>
      <div className='flex-column gap-4'>
        <Switch
          size='md'
          isSelected={showEmail}
          onChange={async () => {
            setShowEmail(!showEmail)
            await updateUserAsync({ showEmail: !user.showEmail })
          }}
        >
          <div className='flex flex-col gap-1'>
            <p className='text-medium'>Public email</p>
            <p className='text-tiny text-default-400'>
              People will be able to contact you by your profile email.
            </p>
          </div>
        </Switch>

        <Switch
          onChange={() => {
            setTheme(theme === 'dark' ? 'light' : 'dark')
          }}
          isSelected={theme === 'dark'}
          size='md'
          color='secondary'
          thumbIcon={({ isSelected, className }) =>
            isSelected ? (
              <SunIcon className={className} />
            ) : (
              <MoonIcon className={className} />
            )
          }
        >
          <div className='flex flex-col gap-1'>
            <p className='text-medium'>Change theme</p>
            <p className='text-tiny text-default-400'>
              Set the current aplication theme to light/dark.
            </p>
          </div>
        </Switch>
      </div>
      <Button
        className='text-pink-600 hover:cursor-pointer mt-8'
        variant='bordered'
        onClick={logout}
      >
        Log Out
      </Button>
    </TransitionAnimation>
  )
}
export default Settings
