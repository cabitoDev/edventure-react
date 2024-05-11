import Auth0Lock from 'auth0-lock'
import Constants from '../../constants'

export const lock = new Auth0Lock(
  window.location.origin.includes('vercel')
    ? Constants.CLIENT_PRO
    : Constants.CLIENT_DEV,
  Constants.DOMAIN,
  {
    auth: {
      responseType: 'token id_token',
      onRedirectCallback: '/',

      params: {
        scope: 'openid profile email'
      }
    }
  }
)
