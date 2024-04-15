'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Button, Link, Switch } from '@nextui-org/react'
import { SunIcon } from '../components/settings/Sun'
import { MoonIcon } from '../components/settings/Moon'
import { useNavigate } from 'react-router'

export function Settings () {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const navigateTo = useNavigate()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className='flex-column'>
      <p className='text-2xl pl-10'>Settings:</p>
      <div className='flex-column center gap-4'>
        <div className='flex pl-5 gap-2'>
          <p>Change theme</p>
          <Switch
            onChange={() => {
              setTheme(theme === 'dark' ? 'light' : 'dark')
            }}
            isSelected={theme === 'dark'}
            size='lg'
            color='secondary'
            thumbIcon={({ isSelected, className }) =>
              isSelected ? (
                <SunIcon className={className} />
              ) : (
                <MoonIcon className={className} />
              )
            }
          ></Switch>
        </div>
        <Button
          className='text-pink-600 hover:cursor-pointer'
          variant='bordered'
          onClick={() => {
            navigateTo('/')
            dispatch(updateUser(null))
          }}
        >
          Log Out
        </Button>
      </div>
    </div>
  )
}
