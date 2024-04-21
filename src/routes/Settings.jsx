import { useTheme } from 'next-themes'
import React, { useState } from 'react'
import { Button, Switch } from '@nextui-org/react'
import { SunIcon, MoonIcon, TransitionAnimation } from '../components'
import { useLogout, useUpdateUser } from '../hooks'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { changeLanguage } from 'i18next'

const Settings = () => {
  const { theme, setTheme } = useTheme()
  const { t } = useTranslation('edventure')

  const logout = useLogout()
  const user = useSelector(state => state.user)
  const { updateUserAsync } = useUpdateUser()
  const [showEmail, setShowEmail] = useState(user.showEmail)

  return (
    <TransitionAnimation className='flex-column center gap-4'>
      <p className='text-2xl align-start pb-5'>{t('SETTINGS')}</p>
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
            <p className='text-medium'>{t('PUBLIC_EMAIL')}</p>
            <p className='text-tiny text-default-400'>
              {t('PUBLIC_EMAIL_MESSAGE')}
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
            <p className='text-medium'>{t('CHANGE_THEME')}</p>
            <p className='text-tiny text-default-400'>
              {t('CHANGE_THEME_MESSAGE')}
            </p>
          </div>
        </Switch>
        <div className='flex  gap-3 items-center'>
          <p className='text-medium'>{t('CHANGE_LANGUAGE')}</p>
          <Button
            variant='bordered'
            color='primary'
            onClick={() => changeLanguage('es')}
          >
            spanish
          </Button>
          <Button
            variant='bordered'
            color='primary'
            onClick={() => changeLanguage('en')}
          >
            english
          </Button>
        </div>
      </div>
      <Button
        color='danger'
        className='text-pink-600 hover:cursor-pointer mt-8'
        variant='bordered'
        onClick={logout}
      >
        {t('LOGOUT')}
      </Button>
    </TransitionAnimation>
  )
}
export default Settings
