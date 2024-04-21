import { useState } from 'react'
import { useSelector } from 'react-redux'
import Constants from '../constants'
import { httpPut } from '../utils'

const useUpdateUser = () => {
  const user = useSelector(state => state.user)
  const [isLoading, setIsLoading] = useState(false)

  async function updateUserAsync (userUpdatedInfo) {
    setIsLoading(true)
    const updatedUser = await httpPut(
      Constants.USERS_ENDPOINT_URL,
      userUpdatedInfo,
      user.id
    )
    if (!updatedUser) {
      throw new Error('Failed getting user')
    }
    setIsLoading(false)
    return updatedUser
  }

  return { updateUserAsync, isLoading }
}

export default useUpdateUser
