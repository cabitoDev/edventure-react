import React, { useEffect, useRef, useState } from 'react'
import { Button, Avatar, Input, Spinner } from '@nextui-org/react'
// eslint-disable-next-line no-unused-vars
import appFirebase from '../config/firebase/firebase'
import { useForm } from 'react-hook-form'
import assets from '../../public/assets'
import { uploadImage } from '../utils'
import { useUpdateUser, useUser } from '../hooks'
import { TransitionAnimation } from '../components'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

const Profile = () => {
  const { user, userLoading } = useUser()
  const token = useSelector(state => state.token)
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm()
  useEffect(() => {
    if (user) {
      Object.keys(user).forEach(key => {
        setValue(key, user[key])
      })
    }
  }, [user, setValue])

  const { t } = useTranslation('edventure')
  const avatarInputRef = useRef()
  const [isEditing, setIsEditing] = useState(false)
  const { updateUserAsync, isLoading } = useUpdateUser(user, token)

  const handleChange = async e => {
    const newAvatar = await uploadImage('avatars', user.id, e.target.files[0])
    await updateUserAsync({ avatar: newAvatar, id: user.id })
  }

  const onSubmit = async data => {
    const updatedUser = await updateUserAsync(data)
    if (!updatedUser) {
      console.error('Error updating user')
    }
    setIsEditing(false)
  }

  if (userLoading) {
    return <Spinner className='center pt-40 flex' />
  }

  if (user) {
    return (
      <TransitionAnimation className='gap-md flex-column'>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='flex-column gap-4 ml-10 mr-10 center pb-3'
        >
          <div className='flex-column gap-3 center'>
            <button
              onClick={e => {
                e.preventDefault()
                avatarInputRef.current.click()
              }}
            >
              <Avatar className='w-40 h-40' src={user.avatar} />
            </button>
            <p>
              {t('MEMBER_SINCE')} {new Date(user.loggedDate).toDateString()}
            </p>
          </div>
          <input
            data-testid='AVATAR'
            ref={avatarInputRef}
            style={{ display: 'none' }}
            type='file'
            id='file-input'
            onChange={handleChange}
          />
          <div className='md:grid md:grid-cols-2 gap-4 flex flex-col'>
            <Input
              data-testid='EMAIL'
              {...register('email', {
                required: true,
                pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/
              })}
              value={watch('email')}
              isInvalid={errors.email && true}
              errorMessage={errors.email ? t('EMAIL_ERROR') : ''}
              id='email'
              isDisabled={!isEditing}
              defaultValue={user.email}
              label={t('EMAIL')}
            />
            <Input
              data-testid='NICKNAME'
              {...register('nickname', {
                required: true,
                minLength: 5,
                maxLength: 20
              })}
              isInvalid={errors.nickname && true}
              id='nickname'
              isDisabled={!isEditing}
              defaultValue={user.nickname}
              errorMessage={errors.nickname ? t('NICKNAME_ERROR') : ''}
              label={t('NICKNAME')}
            />

            <Input
              data-testid='NAME'
              {...register('name', {
                required: true,
                minLength: 2,
                maxLength: 20
              })}
              errorMessage={errors.name ? t('NAME_ERROR') : ''}
              isInvalid={errors.name && true}
              id='name'
              isDisabled={!isEditing}
              defaultValue={user.name}
              label={t('NAME')}
            />
            <Input
              data-testid='LASTNAME'
              {...register('lastname', {
                required: true,
                minLength: 2,
                maxLength: 20
              })}
              errorMessage={errors.lastname ? t('LASTNAME_ERROR') : ''}
              isInvalid={errors.lastname && true}
              isDisabled={!isEditing}
              defaultValue={user.lastname}
              label={t('LASTNAME')}
            />
          </div>

          {isEditing ? (
            <Button
              data-testid='SAVE'
              isLoading={isLoading}
              color='primary'
              type='submit'
              className='self-end'
            >
              {t('SAVE')}
            </Button>
          ) : (
            <Button
              data-testid='EDIT'
              type='button'
              isLoading={isLoading}
              onClick={e => {
                e.preventDefault()
                setIsEditing(true)
              }}
              color='primary'
              className='self-end'
            >
              {t('EDIT')}
              <img src={assets.edit} />
            </Button>
          )}
          <div className='flex justify-between w-full'>
            <div className='flex flex-col items-center'>
              <p className='text-5xl font-thin'>{user.userEvents.length}</p>
              <p className='text-sm text-gray-500 text-center'>
                {t('EVENTS_CREATED')}
              </p>
            </div>

            <div className='flex flex-col items-center'>
              <p className='text-5xl font-thin'>
                {user.followingEvents.length}
              </p>
              <p className='text-sm text-gray-500 text-center'>
                {t('EVENTS_FOLLOWING')}
              </p>
            </div>
          </div>
        </form>
      </TransitionAnimation>
    )
  }
}
export default Profile
