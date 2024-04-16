import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'
import { Button } from '@nextui-org/button'
import { Avatar } from '@nextui-org/avatar'
import { updateUser } from '../redux/userSlice'
import { httpUpdateUser } from '../utils/httpUtils'
import appFirebase from '../firebase/firebase'
import { Input } from '@nextui-org/input'
import { useForm } from 'react-hook-form'
import assets from '../assets'
import { Switch } from '@nextui-org/switch'
import { cn } from '@nextui-org/system-rsc'

export const Profile = () => {
  const { register, handleSubmit, setValue, watch } = useForm()
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const [avatar, setAvatar] = useState(user.avatar)
  const [isNewAvatar, setIsNewAvatar] = useState()
  const [file, setFile] = useState()
  const [editingName, setEditingName] = useState()
  const [editingLastname, setEditingLastname] = useState()
  const [editingNickname, setEditingNickname] = useState()
  const [editingEmail, setEditingEmail] = useState()
  const [isLoading, setIsLoading] = useState()
  const [formChanged, setFormChanged] = useState()

  function handleChange (e) {
    setIsNewAvatar(true)
    const selectedFile = e.target.files[0]
    setFile(e.target.files[0])
    setAvatar(URL.createObjectURL(selectedFile))
  }

  const onSubmit = async data => {
    console.log(data)
    setIsLoading(true)
    const newAvatar = isNewAvatar ? await uploadImage() : user.avatar
    const userUpdatedInfo = { ...data, avatar: newAvatar, id: user.id }
    await httpUpdateUser(userUpdatedInfo)
      .then(userUpdated => {
        if (userUpdated) {
          dispatch(updateUser(userUpdated))
        } else {
          alert('Error updating user')
        }
      })
      .catch(() => {
        alert('Error updating user')
      })
    setIsLoading(false)
    setFormChanged(false)
  }

  async function uploadImage () {
    const storage = getStorage()
    const storageRef = ref(storage, `avatars/${user.id}`)
    const snapshot = await uploadBytes(storageRef, file)
    const downloadURL = await getDownloadURL(snapshot.ref)
    return downloadURL
  }

  return (
    <form
      onChange={() => setFormChanged(true)}
      onSubmit={handleSubmit(onSubmit)}
      className='flex-column gap-4 ml-10 mr-10 center pb-3'
    >
      <div className='flex-column gap-3 center'>
        <button onClick={() => document.getElementById('file-input').click()}>
          <Avatar
            value={avatar}
            className='w-40 h-40 text-large'
            src={avatar}
          />
        </button>
        <p>Member since {new Date(user.loggedDate).toDateString()}</p>
      </div>
      <input
        style={{ display: 'none' }}
        value={avatar}
        {...register('avatar')}
      />
      <input
        style={{ display: 'none' }}
        type='file'
        id='file-input'
        onChange={handleChange}
      />
      <div className='flex-column gap-3'>
        <Switch
          {...register('showEmail')}
          onClick={() => setFormChanged(true)}
          classNames={{
            base: cn(
              'inline-flex flex-row-reverse w-full max-w-md bg-content1 hover:bg-content2 items-center',
              'justify-between cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent',
              'data-[selected=true]:border-primary'
            ),
            wrapper: 'p-0 h-4 overflow-visible',
            thumb: cn(
              'w-6 h-6 border-2 shadow-lg',
              'group-data-[hover=true]:border-primary',
              //selected
              'group-data-[selected=true]:ml-6',
              // pressed
              'group-data-[pressed=true]:w-7',
              'group-data-[selected]:group-data-[pressed]:ml-4'
            )
          }}
          onChange={() => setValue('showEmail', !watch('showEmail'))}
        >
          <div className='flex flex-col gap-1'>
            <p className='text-medium'>Public email</p>
            <p className='text-tiny text-default-400'>
              People will be able to contact you by your profile email.
            </p>
          </div>
        </Switch>
        <Input
          {...register('email')}
          id='email'
          onBlur={() => setEditingEmail(false)}
          isReadOnly={!editingEmail}
          isClearable={editingEmail}
          defaultValue={user.email}
          endContent={
            !editingEmail && (
              <button
                onClick={() => {
                  setEditingEmail(true)
                  document.getElementById('email').focus()
                }}
              >
                <img className='pb-1' src={assets.edit} />
              </button>
            )
          }
          label='Email'
        />
        <Input
          {...register('nickname')}
          id='nickname'
          onBlur={() => setEditingNickname(false)}
          isReadOnly={!editingNickname}
          isClearable={editingNickname}
          defaultValue={user.nickname}
          endContent={
            !editingEmail && (
              <button
                onClick={() => {
                  setEditingEmail(true)
                  document.getElementById('nickname').focus()
                }}
              >
                <img className='pb-1' src={assets.edit} />
              </button>
            )
          }
          label='Nickname'
        />

        <Input
          {...register('name')}
          id='name'
          onBlur={() => setEditingName(false)}
          isReadOnly={!editingName}
          isClearable={editingName}
          defaultValue={user.name}
          endContent={
            !editingName && (
              <button
                onClick={() => {
                  setEditingName(true)
                  document.getElementById('name').focus()
                }}
              >
                <img className='pb-1' src={assets.edit} />
              </button>
            )
          }
          label='Name'
        />
        <Input
          {...register('lastname')}
          id='lastname'
          onBlur={() => setEditingLastname(false)}
          isReadOnly={!editingLastname}
          isClearable={editingLastname}
          defaultValue={user.lastname}
          endContent={
            !editingLastname && (
              <button
                onClick={() => {
                  setEditingLastname(true)
                  document.getElementById('lastname').focus()
                }}
              >
                <img className='pb-1' src={assets.edit} />
              </button>
            )
          }
          label='Lastname'
        />
      </div>

      <Button
        isLoading={isLoading}
        isDisabled={!formChanged}
        type='submit'
        color='primary'
        className='self-end'
        // onClick={saveChanges}
      >
        Save
      </Button>
    </form>
  )
}
