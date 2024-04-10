import { Constants } from '../constants'

export const getUserById = async id => {
  return fetch(`${Constants.USERS_ENDPOINT_URL}/${id}`)
    .then(response => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error('Error al buscar el usuario')
      }
    })
    .catch(error => {
      console.error('Error:', error.message)
      return null
    })
}
