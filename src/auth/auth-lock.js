import Auth0Lock from 'auth0-lock'
import Constants from '../constants'

export const lock = new Auth0Lock(
  window.location.origin.includes('edventure-six.vercel.app')
    ? Constants.CLIENT_PRO
    : Constants.CLIENT_DEV,
  Constants.DOMAIN,
  {
    auth: {
      redirect: false
    }
  }
)

export const checkLogged = user => {
  if (!user) {
    lock.show()
  }
}
