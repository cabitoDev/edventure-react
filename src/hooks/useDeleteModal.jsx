import { useNavigate } from 'react-router-dom'
import Constants from '../constants'
import { httpDelete } from '../utils'
import { useState } from 'react'

const useDeleteModal = (eventId, token) => {
  const [isOpenDelete, setIsOpenDelete] = useState(false)
  const navigateTo = useNavigate()

  const onDelete = async () => {
    const deletedEvent = await httpDelete(
      Constants.EVENTS_ENDPOINT_URL,
      token,
      eventId
    )
    if (deletedEvent) {
      navigateTo('/my-events')
    }
  }

  return { onDelete, isOpenDelete, setIsOpenDelete }
}

export default useDeleteModal
