import { Select, SelectItem } from '@nextui-org/react'
import { Constants } from '../../constants'
import { useDispatch, useSelector } from 'react-redux'
import { typeUpated } from '../../redux/eventSlice'
import { useEffect } from 'react'
import { nextStepAvailable } from '../../redux/nextStepSlice'
export const Step2 = () => {
  const event = useSelector(state => state.event)
  const dispatch = useDispatch()
  useEffect(() => {
    if (event.type === '') dispatch(nextStepAvailable(false))
  }, [])
  return (
    <>
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
      <p>Upload your own icon</p>
    </>
  )
}
