import Constants from '../constants'

export const httpGet = async (baseUrl, token, id) => {
  const endpoint = id ? `${baseUrl}/${id}` : baseUrl
  const response = await fetch(endpoint, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return response.json()
}

export const httpPost = async (baseUrl, body, token) => {
  const response = await fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(body)
  })
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return response.json()
}

export const httpPut = async (baseUrl, body, id, token) => {
  const endpoint = `${baseUrl}/${id}`
  const response = await fetch(endpoint, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(body)
  })
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return response.json()
}

export const httpDelete = async (baseUrl, token, id) => {
  const endpoint = `${baseUrl}/${id}`
  const response = await fetch(endpoint, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return true
}

export const updateFollowingEvents = async (userId, eventId, method, token) => {
  const endpoint = `${Constants.USERS_ENDPOINT_URL}/${userId}/updateFollowingEvent/${eventId}`
  const response = await fetch(endpoint, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  })
  if (response.ok) {
    const userUpdated = await response.json()
    return userUpdated
  } else {
    console.error(`Error in the request to ${endpoint}`)
    return null
  }
}
