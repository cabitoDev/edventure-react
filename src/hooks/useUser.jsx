import { useSelector } from 'react-redux'
import Constants from '../constants'
import { useQuery } from 'react-query'
import useFetch from './useFetch'

const useUser = () => {
  const stateUser = useSelector(state => state.user)
  const { httpGet } = useFetch()
  const { data: user, status } = useQuery('updatedUser', () =>
    httpGet(Constants.USERS_ENDPOINT_URL, stateUser.id)
  )

  return { user, userLoading: status === 'loading' }
}

export default useUser
