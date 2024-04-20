import Constants from '../constants'

export const httpGet = async (baseUrl, id) => {
  const endpoint = id ? `${baseUrl}/${id}` : baseUrl
  const response = await fetch(endpoint)
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return response.json()
}

export const httpPost = async (baseUrl, body) => {
  const response = await fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return response.json()
}

export const httpPut = async (baseUrl, body, id) => {
  const endpoint = `${baseUrl}/${id}`
  const response = await fetch(endpoint, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return response.json()
}

export const httpDelete = async (baseUrl, id) => {
  const endpoint = `${baseUrl}/${id}`
  const response = await fetch(endpoint, {
    method: 'DELETE'
  })
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return response.json()
}

export const updateFollowingEvents = async (userId, eventId, method) => {
  const endpoint = `${Constants.USERS_ENDPOINT_URL}/${userId}/updateFollowingEvent/${eventId}`
  const response = await fetch(endpoint, {
    method: method,
    headers: {
      'Content-Type': 'application/json'
    }
  })
  if (response.ok) {
    return true
  } else {
    console.error(`Error in the request to ${endpoint}`)
    return null
  }
}
