import { Constants } from '../constants'

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

export const getEventById = async id => {
  try {
    const response = await fetch(`${Constants.EVENTS_ENDPOINT_URL}/${id}`)
    if (!response.ok) {
      throw new Error('No se pudo obtener el evento')
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error:', error.message)
    return null
  }
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

export const saveUser = async user => {
  return fetch(Constants.USERS_ENDPOINT_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })
    .then(response => {
      return response.json()
    })
    .catch(error => {
      console.error('Error al realizar la solicitud:', error)
      return null
    })
}

export const updateUser = async user => {
  return fetch(`${Constants.USERS_ENDPOINT_URL}/${user.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })
    .then(response => {
      return response.json()
    })
    .catch(error => {
      console.error('Error al realizar la solicitud:', error)
      return null
    })
}

export const saveEvent = async eventInfo => {
  try {
    const response = await fetch(Constants.EVENTS_ENDPOINT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(eventInfo)
    })
    if (!response.ok) {
      throw new Error('Error al realizar la solicitud')
    }
    return await response.json()
  } catch (error) {
    console.error('Error al realizar la solicitud:', error)
    throw error // Rechaza la promesa para que el error se maneje externamente
  }
}
