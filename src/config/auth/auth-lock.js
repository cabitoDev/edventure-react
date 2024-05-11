import Auth0Lock from 'auth0-lock'
import Constants from '../../constants'

export const lock = new Auth0Lock(
  window.location.origin.includes('localhost')
    ? Constants.CLIENT_DEV
    : Constants.CLIENT_PRO,
  Constants.DOMAIN,
  {
    auth: {
      redirect: false,
      responseType: 'token id_token',
      onRedirectCallback: '/',

      params: {
        scope: 'openid profile email'
      }
    }
  }
)
