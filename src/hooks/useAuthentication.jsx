import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { updateUser, updateToken } from '../redux'
import { getLoginRequest, httpPost } from '../utils'
import { lock } from '../config/auth/auth-lock'
import Constants from '../constants'

const useAuthentication = () => {
  const user = useSelector(state => state.user)
  const token = useSelector(state => state.token)
  const dispatch = useDispatch()
  const navigateTo = useNavigate()

  const handleAuthenticated = async authResult => {
    lock.hide()
    lock.getUserInfo(authResult.accessToken, async (error, profile) => {
      if (error) {
        console.error('Error getting user:', error)
        return
      }
      const userLogged = await httpPost(
        Constants.USERS_ENDPOINT_URL,
        getLoginRequest(profile),
        authResult.idToken
      )
      if (userLogged) {
        dispatch(updateToken(authResult.idToken))
        dispatch(updateUser(userLogged))
        navigateTo('/profile')
      } else {
        console.error('Error in login')
      }
    })
  }

  useEffect(() => {
    lock.on('authenticated', handleAuthenticated)

    return () => {
      lock.off('authenticated', handleAuthenticated)
    }
  }, [])

  const showLogin = () => {
    lock.show()
  }

  const hideLogin = () => {
    lock.hide()
  }

  return { user, showLogin, hideLogin }
}

export default useAuthentication
