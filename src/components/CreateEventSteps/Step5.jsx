import { Select, SelectItem } from '@nextui-org/react'
import { Constants } from '../../constants'
import { useDispatch, useSelector } from 'react-redux'
import { assistantsUpated } from '../../redux/eventSlice'
import { useEffect, useState } from 'react'
import { nextStepAvailable } from '../../redux/nextStepSlice'
export const Step5 = () => {
  const event = useSelector(state => state.event)
  const dispatch = useDispatch()
  const [assistants, setAssistants] = useState('')
  useEffect(() => {
    setAssistants(event.assistants)
  }, [event])
  useEffect(() => {
    if (assistants === '') {
      dispatch(nextStepAvailable(false))
      return
    }
    dispatch(nextStepAvailable(true))
  }, [assistants])
  return (
    <>
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
        defaultSelectedKeys={[event.assistants]}
        defaultOpen={event.assistants === ''}
        label='Number of assistants'
        className='max-w-xs'
      >
        {Constants.ASSISTANTS_NUMBER.map(assistants => (
          <SelectItem key={assistants} value={assistants}>
            {assistants}
          </SelectItem>
        ))}
      </Select>
    </>
  )
}
