import React, { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { Button, Avatar, Input } from '@nextui-org/react'
// eslint-disable-next-line no-unused-vars
import appFirebase from '../firebase/firebase'
import { useForm } from 'react-hook-form'
import assets from '../assets'
import { uploadImage } from '../utils'
import { useUpdateUser } from '../hooks'
import { TransitionAnimation } from '../components'

const Profile = () => {
  const user = useSelector(state => state.user)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues: user
  })
  const avatarInputRef = useRef()
  const [isEditing, setIsEditing] = useState(false)
  const { updateUserAsync, isLoading } = useUpdateUser()

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
  const onError = async data => {
    console.log(data)
  }

  return (
    <TransitionAnimation className='gap-md flex-column'>
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
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
          <p>Member since {new Date(user.loggedDate).toDateString()}</p>
        </div>
        <input
          ref={avatarInputRef}
          style={{ display: 'none' }}
          type='file'
          id='file-input'
          onChange={handleChange}
        />
        <div className='md:grid md:grid-cols-2 gap-4 flex flex-col'>
          <Input
            {...register('email', {
              required: true,
              pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/
            })}
            value={watch('email')}
            isInvalid={errors.email && true}
            errorMessage={errors.email ? 'Input a correct email' : ''}
            id='email'
            isDisabled={!isEditing}
            defaultValue={user.email}
            label='Email'
          />
          <Input
            {...register('nickname', {
              required: true,
              minLength: 5,
              maxLength: 20
            })}
            isInvalid={errors.nickname && true}
            id='nickname'
            isDisabled={!isEditing}
            defaultValue={user.nickname}
            errorMessage={
              errors.nickname ? 'Required nickname between 5-20 char' : ''
            }
            label='Nickname'
          />

          <Input
            {...register('name', {
              required: true,
              minLength: 2,
              maxLength: 20
            })}
            errorMessage={errors.name ? 'Required name between 5-20 char' : ''}
            isInvalid={errors.name && true}
            id='name'
            isDisabled={!isEditing}
            defaultValue={user.name}
            label='Name'
          />
          <Input
            {...register('lastname', {
              required: true,
              minLength: 5,
              maxLength: 20
            })}
            errorMessage={
              errors.lastname ? 'Required lastname between 5-20 char' : ''
            }
            isInvalid={errors.lastname && true}
            isDisabled={!isEditing}
            defaultValue={user.lastname}
            label='Lastname'
          />
        </div>

        {isEditing ? (
          <Button
            isLoading={isLoading}
            color='primary'
            type='submit'
            className='self-end'
          >
            Save
          </Button>
        ) : (
          <Button
            type='button'
            isLoading={isLoading}
            onClick={e => {
              e.preventDefault()
              setIsEditing(true)
            }}
            color='primary'
            className='self-end'
          >
            Edit
            <img src={assets.edit} />
          </Button>
        )}
        <div className='flex justify-between w-full'>
          <div className='flex flex-col items-center'>
            <p className='text-5xl font-thin'>{user.userEvents.length}</p>
            <p className='text-sm text-gray-500 text-center'>Events created</p>
          </div>

          <div className='flex flex-col items-center'>
            <p className='text-5xl font-thin'>{user.followingEvents.length}</p>
            <p className='text-sm text-gray-500 text-center'>
              Events following
            </p>
          </div>
        </div>
      </form>
    </TransitionAnimation>
  )
}
export default Profile
