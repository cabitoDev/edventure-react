import { useSelector } from 'react-redux'
import { httpGet } from '../utils'
import Constants from '../constants'

const useGetUser = () => {
  const user = useSelector(state => state.user)
  const getUpdatedUser = async () => {
    const userInfo = await httpGet(Constants.USERS_ENDPOINT_URL, user.id)
    if (!userInfo) {
      throw new Error('Failed getting user')
    }
    return userInfo
  }

  return { getUpdatedUser }
}

export default useGetUser
