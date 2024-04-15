import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'
import { Image } from '@nextui-org/image'
import assets from '../assets'
import { Button } from '@nextui-org/button'
import { Avatar } from '@nextui-org/avatar'
import { updateUser } from '../redux/userSlice'
import { httpUpdateUser } from '../utils/httpUtils'
import appFirebase from '../firebase/firebase'

export const Profile = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const [avatar, setAvatar] = useState(user.avatar)
  const [file, setFile] = useState()

  function handleChange (e) {
    const selectedFile = e.target.files[0]
    setFile(e.target.files[0])
    setAvatar(URL.createObjectURL(selectedFile))
  }

  async function uploadImage () {
    try {
      const storage = getStorage()
      const storageRef = ref(storage, `avatars/${user.id}`)
      const snapshot = await uploadBytes(storageRef, file)
      const downloadURL = await getDownloadURL(snapshot.ref)

      await httpUpdateUser({
        id: user.id,
        avatar: downloadURL
      })
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

      console.log('Image uploaded successfully!')
    } catch (error) {
      console.error('Error uploading image:', error)
      alert('Error uploading image')
    }
  }

  const saveChanges = () => {
    uploadImage()
  }

  return (
    <>
      <img src={avatar} height='200px' width='200px' />
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
