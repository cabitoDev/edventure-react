import { Select, SelectItem } from '@nextui-org/react'
import { Constants } from '../../constants'
import { useDispatch, useSelector } from 'react-redux'
import { typeUpated } from '../../redux/eventSlice'
import { useEffect, useState } from 'react'
import { nextStepAvailable } from '../../redux/nextStepSlice'
import { TransitionAnimation } from '../TransitionAnimation'
export const StepType = () => {
  const event = useSelector(state => state.event)
  const dispatch = useDispatch()
  const [type, setType] = useState('')
  useEffect(() => {
    setType(event.type)
  }, [event])
  useEffect(() => {
    if (type === '') {
      dispatch(nextStepAvailable(false))
      return
    }
    dispatch(nextStepAvailable(true))
  }, [type])
  return (
    <TransitionAnimation>
      <p className='text-3xl text-center'>{Constants.QUESTION_STEP_TYPE}</p>
      <Select
        onChange={event => {
          dispatch(typeUpated(event.target.value))
          if (event.target.value === '') {
            dispatch(nextStepAvailable(false))
            return
          }
          dispatch(nextStepAvailable(true))
        }}
        defaultSelectedKeys={[event.type]}
        defaultOpen={event.type === ''}
        label='Type of event'
        className='max-w-xs'
      >
        {Constants.EVENT_TYPES.map(type => (
          <SelectItem key={type} value={type}>
            {type}
          </SelectItem>
        ))}
      </Select>
    </TransitionAnimation>
  )
}
