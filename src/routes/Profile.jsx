import { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from '@nextui-org/button'
import { Avatar } from '@nextui-org/avatar'
import { updateUser } from '../redux/userSlice'
import { httpUpdateUser } from '../utils/httpUtils'
import appFirebase from '../firebase/firebase'
import { Input } from '@nextui-org/input'
import { useForm } from 'react-hook-form'
import assets from '../assets'
import { uploadImage } from '../utils/utils'
import useUpdateUser from '../hooks/useUpdateUser'

export const Profile = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm()
  const avatarInputRef = useRef()
  const user = useSelector(state => state.user)
  const [isEditing, setIsEditing] = useState(false)
  const { updateUserAsync, isLoading } = useUpdateUser()

  const handleChange = async e => {
    const newAvatar = await uploadImage('avatars', user.id, e.target.files[0])
    await updateUserAsync({ avatar: newAvatar, id: user.id })
  }

  const onSubmit = async data => {
    console.log(data)
    const userUpdatedInfo = { ...data, id: user.id }
    const updatedUser = await updateUserAsync(userUpdatedInfo)
    if (!updatedUser) {
      alert('Error updating user')
    }
    setIsEditing(false)
  }

  return (
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
            pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/
          })}
          value={watch('email')}
          isInvalid={errors.email ? true : false}
          errorMessage={errors.email ? 'Input a correct email' : ''}
          id='email'
          isDisabled={!isEditing}
          defaultValue={user.email}
          label='Email'
        />
        <Input
          {...register('nickname', { minLength: 5, maxLength: 20 })}
          isInvalid={errors.nickname ? true : false}
          id='nickname'
          isDisabled={!isEditing}
          defaultValue={user.nickname}
          errorMessage={
            errors.nickname ? 'Required nickname between 5-20 char' : ''
          }
          label='Nickname'
        />

        <Input
          {...register('name', { minLength: 2, maxLength: 20 })}
          errorMessage={errors.name ? 'Required name between 5-20 char' : ''}
          isInvalid={errors.name ? true : false}
          id='name'
          isDisabled={!isEditing}
          defaultValue={user.name}
          label='Name'
        />
        <Input
          {...register('lastname', { minLength: 5, maxLength: 20 })}
          errorMessage={
            errors.lastname ? 'Required lastname between 5-20 char' : ''
          }
          isInvalid={errors.lastname ? true : false}
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
          <p className='text-sm text-gray-500 text-center'>Events following</p>
        </div>
      </div>
    </form>
  )
}
