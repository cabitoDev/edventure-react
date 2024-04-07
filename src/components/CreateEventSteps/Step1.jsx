import { Input } from '@nextui-org/react'
import { useDispatch, useSelector } from 'react-redux'
import { nameUpated } from '../../redux/eventSlice'
import { nextStepAvailable } from '../../redux/nextStepSlice'
import { useEffect, useState } from 'react'

export const Step1 = () => {
  const event = useSelector(state => state.event)
  const [name, setName] = useState('')
  const dispatch = useDispatch()

  const handleChange = event => {
    dispatch(nameUpated(event.target.value))
    if (event.target.value === '') {
      dispatch(nextStepAvailable(false))
      return
    }
    if (!event.nextStep) dispatch(nextStepAvailable(true))
  }

  useEffect(() => {
    setName(event.name)
  }, [event])
  useEffect(() => {
    if (event.name !== '') dispatch(nextStepAvailable(true))
  }, [])

  return (
    <Input
      autoFocus
      placeholder='Type a name'
      className='max-w-xs'
      value={name}
      onChange={handleChange}
    />
  )
}
