import { useState } from 'react'
import { useSelector } from 'react-redux'
import Constants from '../constants'

const useUpdateUser = () => {
  const user = useSelector(state => state.user)
  const [isLoading, setIsLoading] = useState(false)

  async function updateUserAsync (userUpdatedInfo) {
    setIsLoading(true)
    try {
      const response = await fetch(
        `${Constants.USERS_ENDPOINT_URL}/${user.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(userUpdatedInfo)
        }
      )

      if (!response.ok) {
        throw new Error('Failed to update user')
      }

      const updatedUser = await response.json()
      return updatedUser
    } catch (error) {
      console.error('Error updating user:', error)
      return null
    } finally {
      setIsLoading(false)
    }
  }

  return { updateUserAsync, isLoading }
}

export default useUpdateUser
