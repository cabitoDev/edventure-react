import { useTheme } from 'next-themes'
import React, { useState } from 'react'
import { Button, Switch } from '@nextui-org/react'
import {
  SunIcon,
  MoonIcon,
  TransitionAnimation,
  DeleteModal
} from '../components'
import { useLogout, useUpdateUser } from '../hooks'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { changeLanguage } from 'i18next'
import { httpDelete } from '../utils'
import Constants from '../constants'
import { useNavigate } from 'react-router-dom'
import { updateUser } from '../redux'

const Settings = () => {
  const { theme, setTheme } = useTheme()
  const { t } = useTranslation('edventure')
  const navigateTo = useNavigate()
  const dispatch = useDispatch()
  const logout = useLogout()
  const user = useSelector(state => state.user)
  const { updateUserAsync } = useUpdateUser()
  const [showEmail, setShowEmail] = useState(user.showEmail)
  const [isOpenDelete, setIsOpenDelete] = useState(false)
  const deleteAccount = async () => {
    await httpDelete(Constants.USERS_ENDPOINT_URL, user.id)
    dispatch(updateUser(null))
    navigateTo('/')
  }

  return (
    <TransitionAnimation className='flex-column center gap-4'>
      <p className='text-2xl align-start pb-5'>{t('SETTINGS')}</p>
      <div className='flex-column gap-4'>
        <Switch
          data-testid='CHANGE_EMAIL_TYPE'
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
          data-testid='CHANGE_THEME'
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
        <div className='flex  gap-3 items-center center pt-4'>
          <p className='text-medium'>{t('CHANGE_LANGUAGE')}</p>
          <Button
            data-testid='LANGUAGE_ES'
            variant='bordered'
            color='primary'
            onClick={() => changeLanguage('es')}
          >
            {t('LANGUAGE_SPANISH')}
          </Button>
          <Button
            data-testid='LANGUAGE_EN'
            variant='bordered'
            color='primary'
            onClick={() => changeLanguage('en')}
          >
            {t('LANGUAGE_ENGLISH')}
          </Button>
        </div>
      </div>
      <Button
        data-testid='DELETE_ACCOUNT'
        color='danger'
        className='text-pink-600 hover:cursor-pointer mt-8'
        variant='bordered'
        onClick={() => setIsOpenDelete(true)}
      >
        {t('DELETE_ACCOUNT')}
      </Button>
      <DeleteModal
        className='flex mr-[23px] center w-[90%]'
        isOpen={isOpenDelete}
        setIsOpen={setIsOpenDelete}
        onDelete={deleteAccount}
        text={t('DELETE_ACCOUNT_MODAL')}
      />
      <Button
        data-testid='LOGOUT'
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
