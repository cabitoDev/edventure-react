import { useDispatch, useSelector } from 'react-redux'
import Constants from '../constants'
import { updateToken } from '../redux'

const useFetch = () => {
  const token = useSelector(state => state.token)
  const dispatch = useDispatch()

  const handleError = response => {
    if (response.status === 401) {
      dispatch(updateToken('EXPIRED'))
    } else {
      console.error(`Error in the request to ${response.url}`)
    }
  }

  const httpGet = async (baseUrl, id) => {
    const endpoint = id ? `${baseUrl}/${id}` : baseUrl
    const response = await fetch(endpoint, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if (!response.ok) {
      handleError(response)
      return null
    }
    return response.json()
  }

  const httpPost = async (baseUrl, body) => {
    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(body)
    })
    if (!response.ok) {
      handleError(response)
      return null
    }
    return response.json()
  }
  const httpLogin = async (baseUrl, body, token) => {
    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(body)
    })
    if (!response.ok) {
      handleError(response)
      return null
    }
    return response.json()
  }

  const httpPut = async (baseUrl, body, id) => {
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
      handleError(response)
      return null
    }
    return response.json()
  }

  const httpDelete = async (baseUrl, id) => {
    const endpoint = `${baseUrl}/${id}`
    const response = await fetch(endpoint, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if (!response.ok) {
      handleError(response)
      return null
    }
    return true
  }

  const updateFollowingEvents = async (userId, eventId, method) => {
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
      handleError(response)
      return null
    }
  }

  return {
    httpLogin,
    httpPut,
    httpPost,
    httpGet,
    httpDelete,
    updateFollowingEvents
  }
}

export default useFetch
