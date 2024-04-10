import { Constants } from '../constants'
import { getLoginRequest } from './utils'

export const getUserById = async id => {
  return fetch(`${Constants.USERS_ENDPOINT_URL}/${id}`)
    .then(response => {
        return response.json()
    })
    .catch(error => {
      console.error('Error:', error.message)
      return null
    })
}

export const getEvents = async () => {
  return fetch(Constants.EVENTS_ENDPOINT_URL)
    .then(response => {
        return response.json()
    })
    .catch(error => {
      console.error('Error:', error.message)
      return null
    })
}

export const postUserInfo = async (user) => {
  return fetch(Constants.USERS_ENDPOINT_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(getLoginRequest(user))
  })
  .then(response => {
      return response.json();
  })
  .catch(error => {
    console.error('Error al realizar la solicitud:', error);
    return null;
  });
}
