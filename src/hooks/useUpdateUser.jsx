import { useState } from 'react'
import { useDispatch } from 'react-redux'
import Constants from '../constants'
import { httpPut } from '../utils'
import { updateUser } from '../redux'

const useUpdateUser = (user, token) => {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)

  async function updateUserAsync (userUpdatedInfo) {
    setIsLoading(true)
    const updatedUser = await httpPut(
      Constants.USERS_ENDPOINT_URL,
      userUpdatedInfo,
      user.id,
      token
    )
    if (!updatedUser) {
      throw new Error('Failed getting user')
    }
    setIsLoading(false)
    dispatch(updateUser(updatedUser))
    return updatedUser
  }

  return { updateUserAsync, isLoading }
}

export default useUpdateUser
