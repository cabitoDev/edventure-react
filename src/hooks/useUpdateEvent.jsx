import { useId, useState } from 'react'
import Constants from '../constants'
import { uploadImage } from '../utils'

const useUpdateEvent = () => {
  const id = useId()
  const [isLoading, setIsLoading] = useState(false)

  async function updateEventAsync (eventInfo) {
    setIsLoading(true)
    const imgFile = eventInfo.image.file
    const newImage = imgFile
      ? await uploadImage('events', id, imgFile)
      : eventInfo.image.url

    try {
      const response = await fetch(
        `${Constants.EVENTS_ENDPOINT_URL}/${eventInfo.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            ...eventInfo,
            image: newImage,
            date: new Date(eventInfo.date)
          })
        }
      )

      if (!response.ok) {
        throw new Error('Failed to update event')
      }
      const updatedEvent = await response.json()
      return updatedEvent
    } catch (error) {
      console.error('Error updating event:', error)
      return null
    } finally {
      setIsLoading(false)
    }
  }

  return { updateEventAsync, isLoading }
}

export default useUpdateEvent
