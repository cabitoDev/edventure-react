import { Select, SelectItem } from '@nextui-org/react'
import { Constants } from '../../constants'
import { useDispatch, useSelector } from 'react-redux'
import { assistantsUpated } from '../../redux/eventSlice'
import { useEffect, useState } from 'react'
import { nextStepAvailable } from '../../redux/nextStepSlice'
import { TransitionAnimation } from '../TransitionAnimation'
export const StepAssistants = () => {
  const event = useSelector(state => state.event)
  const dispatch = useDispatch()
  const [assistants, setAssistants] = useState('')
  useEffect(() => {
    setAssistants(event.assistantsExpected)
  }, [event])
  useEffect(() => {
    if (assistants === '') {
      dispatch(nextStepAvailable(false))
      return
    }
    dispatch(nextStepAvailable(true))
  }, [assistants])
  return (
    <TransitionAnimation>
      <p className='text-3xl text-center'>{Constants.QUESTION_STEP_ASSISTANTS}</p>
      <Select
        autoFocus
        onChange={event => {
          dispatch(assistantsUpated(event.target.value))
          if (event.target.value === '') {
            dispatch(nextStepAvailable(false))
            return
          }
          dispatch(nextStepAvailable(true))
        }}
        defaultSelectedKeys={[event.assistantsExpected]}
        defaultOpen={event.assistantsExpected === ''}
        label='Number of assistants'
        className='max-w-xs'
      >
        {Constants.ASSISTANTS_NUMBER.map(assistants => (
          <SelectItem key={assistants} value={assistants}>
            {assistants}
          </SelectItem>
        ))}
      </Select>
    </TransitionAnimation>
  )
}
