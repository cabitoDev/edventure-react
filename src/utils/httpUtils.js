import Constants from '../constants'

export const httpGet = async (baseUrl, id) => {
  const endpoint = id ? `${baseUrl}/${id}` : baseUrl
  return fetch(endpoint)
    .then(async response => {
      if (response.ok) {
        const formatResp = await response.json()
        return formatResp
      } else {
        console.error(`Error in the request to ${endpoint}`)
        return null
      }
    })
    .catch(error => {
      console.error('Error:', error.message)
      return null
    })
}

export const httpPost = async (baseUrl, body) => {
  return fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
    .then(async response => {
      if (response.ok) {
        const formatResp = await response.json()
        return formatResp
      } else {
        console.error(`Error in the request to ${baseUrl}`)
        return null
      }
    })
    .catch(error => {
      console.error('Error in the request:', error)
      return null
    })
}

export const httpPut = async (baseUrl, body, id) => {
  const endpoint = `${baseUrl}/${id}`
  return fetch(endpoint, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
    .then(async response => {
      if (response.ok) {
        const formatResp = await response.json()
        return formatResp
      } else {
        console.error(`Error in the request to ${baseUrl}`)
        return null
      }
    })
    .catch(error => {
      console.error('Error in te request:', error)
      return null
    })
}

export const httpDelete = async (baseUrl, id) => {
  const endpoint = `${baseUrl}/${id}`
  return fetch(endpoint, {
    method: 'DELETE'
  })
    .then(response => {
      if (response.ok) {
        return id
      } else {
        console.error(`Error in the request to ${baseUrl}`)
        return null
      }
    })
    .catch(error => {
      console.error('Error in the request:', error)
      return null
    })
}

export const updateFollowingEvents = async (userId, eventId, method) => {
  const endpoint = `${Constants.USERS_ENDPOINT_URL}/${userId}/updateFollowingEvent/${eventId}`
  return fetch(endpoint, {
    method: method,
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(async response => {
      if (response.ok) {
        return true
      } else {
        console.error(`Error in the request to ${endpoint}`)
        return null
      }
    })
    .catch(error => {
      console.error('Error al realizar la solicitud:', error)
      return null
    })
}
