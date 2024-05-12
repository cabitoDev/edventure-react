import { useId, useState } from 'react'
import Constants from '../constants'
import { generateRandomNumber, httpPut, uploadImage } from '../utils'

const useUpdateEvent = () => {
  const [isLoading, setIsLoading] = useState(false)

  async function updateEventAsync (eventInfo, token) {
    setIsLoading(true)
    const imgFile = eventInfo.image.file
    const id = generateRandomNumber()
    const newImage = imgFile
      ? await uploadImage('events', id, imgFile)
      : eventInfo.image.url

    const newEventInfo = {
      ...eventInfo,
      image: newImage,
      date: new Date(eventInfo.date)
    }
    const updatedEvent = await httpPut(
      Constants.EVENTS_ENDPOINT_URL,
      newEventInfo,
      eventInfo.id,
      token
    )
    setIsLoading(false)
    return updatedEvent
  }

  return { updateEventAsync, isLoading }
}

export default useUpdateEvent
