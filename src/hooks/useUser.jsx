import { useSelector } from 'react-redux'
import { httpGet } from '../utils'
import Constants from '../constants'
import { useQuery } from 'react-query'

const useUser = () => {
  const stateUser = useSelector(state => state.user)
  const { data: user, status } = useQuery('updatedUser', () =>
    httpGet(Constants.USERS_ENDPOINT_URL, stateUser.id)
  )

  return { user, userLoading: status === 'loading' }
}

export default useUser
