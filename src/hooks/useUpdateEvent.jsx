import { useId, useState } from 'react'
import Constants from '../constants'
import { generateRandomNumber, uploadImage } from '../utils'
import useFetch from './useFetch'

const useUpdateEvent = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { httpPut } = useFetch()

  async function updateEventAsync (eventInfo) {
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
      eventInfo.id
    )
    setIsLoading(false)
    return updatedEvent
  }

  return { updateEventAsync, isLoading }
}

export default useUpdateEvent
