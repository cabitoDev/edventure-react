import { useDispatch } from 'react-redux'
import { updateUser } from '../redux'
import { useNavigate } from 'react-router-dom'

const useLogout = () => {
  const dispatch = useDispatch()
  const navigateTo = useNavigate()

  const logout = () => {
    navigateTo('/')
    dispatch(updateUser(null))
  }

  return logout
}
export default useLogout
