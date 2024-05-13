import { useState } from 'react'
import { useDispatch } from 'react-redux'
import Constants from '../constants'
import { updateUser } from '../redux'
import useFetch from './useFetch'

const useUpdateUser = user => {
  const dispatch = useDispatch()
  const { httpPut } = useFetch()
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
    dispatch(updateUser(updatedUser))
    return updatedUser
  }

  return { updateUserAsync, isLoading }
}

export default useUpdateUser
