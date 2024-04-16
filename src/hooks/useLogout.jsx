import { useDispatch } from 'react-redux'
import { updateUser } from '../redux/userSlice'
import { useNavigate } from 'react-router-dom'

export const useLogout = () => {
  const dispatch = useDispatch()
  const navigateTo = useNavigate()

  const logout = () => {
    navigateTo('/')
    dispatch(updateUser(null))
  }

  return logout
}
