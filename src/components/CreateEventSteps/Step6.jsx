import { Input } from '@nextui-org/react'
import { useDispatch, useSelector } from 'react-redux'
import { descriptionUpated } from '../../redux/eventSlice'
import { nextStepAvailable } from '../../redux/nextStepSlice'
import { useEffect, useState } from 'react'

export const Step6 = () => {
  const event = useSelector(state => state.event)
  const [description, setDescription] = useState('')
  const dispatch = useDispatch()

  const handleChange = event => {
    dispatch(descriptionUpated(event.target.value))
    if (event.target.value === '') {
      dispatch(nextStepAvailable(false))
      return
    }
    if (!event.nextStep) dispatch(nextStepAvailable(true))
  }

  useEffect(() => {
    setDescription(event.description)
  }, [event])
  useEffect(() => {
    if (description === '') {
      dispatch(nextStepAvailable(false))
      return
    }
    dispatch(nextStepAvailable(true))
  }, [description])
  useEffect(() => {
    if (event.description !== '') dispatch(nextStepAvailable(true))
  }, [])

  return (
    <Input
      autoFocus
      placeholder='Put a description of your event'
      className='max-w-xs'
      value={description}
      onChange={handleChange}
    />
  )
}
