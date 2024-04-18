import Constants from '../constants'

export const getUserById = async id => {
  try {
    const response = await fetch(`${Constants.USERS_ENDPOINT_URL}/${id}`)
    if (!response.ok) {
      throw new Error('Error getting user info')
    }
    const userInfo = await response.json()
    return userInfo
  } catch (error) {
    console.error('Error:', error.message)
    return null
  }
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

export const httpUpdateUser = async user => {
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

export const httpUpdateEvent = async event => {
  return fetch(`${Constants.EVENTS_ENDPOINT_URL}/${event.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(event)
  })
    .then(response => {
      return response.json()
    })
    .catch(error => {
      console.error('Error al realizar la solicitud:', error)
      return null
    })
}
export const httpDeleteEvent = async event => {
  return fetch(`${Constants.EVENTS_ENDPOINT_URL}/${event.id}`, {
    method: 'DELETE'
  })
    .then(response => {
      if (response.ok) {
        return event
      }
    })
    .catch(error => {
      console.error('Error al eliminar el evento:', error)
      return false
    })
}

export const updateFollowingEvents = async (userId, eventId, method) => {
  return fetch(
    `${Constants.USERS_ENDPOINT_URL}/${userId}/updateFollowingEvent/${eventId}`,
    {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )
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
    throw error
  }
}
