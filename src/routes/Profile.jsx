import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { Image } from '@nextui-org/image'
import assets from '../assets'
import { Button } from '@nextui-org/button'
import { Avatar } from '@nextui-org/avatar'
import { updateUser } from '../redux/userSlice'
import { Constants } from '../constants'
import { httpUpdateUser, saveUser } from '../utils/httpUtils'

export const Profile = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const [avatar, setAvatar] = useState(user.avatar)

  function handleChange (e) {
    const selectedFile = e.target.files[0]
    setAvatar(URL.createObjectURL(selectedFile))
  }

  async function uploadImage (selectedFile) {
    let newUrl
    const storage = getStorage()
    const storageRef = ref(storage, `avatars/${user.id}`)
    await uploadBytes(storageRef, selectedFile).then(value => {
      getDownloadURL(value.ref).then(url => {
        newUrl = url
      })
    })
    await httpUpdateUser({
      id: user.id,
      avatar: newUrl
    })
      .then(userUpdated => {
        if (userUpdated) {
          dispatch(updateUser(userUpdated))
        } else alert('Error updating user')
      })
      .catch(() => {
        alert('Error updating user')
      })

    console.log('Image uploaded successfully!')
  }

  const saveChanges = () => {
    uploadImage(avatar)
  }

  return (
    <>
      <div className='flex flex-col items-center gap-4'>
        <Avatar src={avatar} />
        <Button
          isIconOnly
          radius='md'
          color='primary'
          onClick={() => document.getElementById('file-input').click()}
        >
          <img src={assets.upload}></img>
        </Button>
        <input
          style={{ display: 'none' }}
          type='file'
          id='file-input'
          onChange={handleChange}
        />
      </div>
      <Button onClick={saveChanges}>Save</Button>
    </>
  )
}
