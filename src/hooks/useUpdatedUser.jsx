import { useSelector } from 'react-redux'
import { httpGet } from '../utils/httpUtils'
import Constants from '../constants'

const useUpdatedUser = () => {
  const user = useSelector(state => state.user)
  async function getUpdatedUser () {
    try {
      const userInfo = await httpGet(Constants.USERS_ENDPOINT_URL, user.id)
      if (!userInfo) {
        throw new Error('Failed getting user')
      }

      return userInfo
    } catch (error) {
      console.error('Error updating user:', error)
      return null
    }
  }

  return { getUpdatedUser }
}

export default useUpdatedUser
