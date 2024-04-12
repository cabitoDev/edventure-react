import { Select, SelectItem } from '@nextui-org/react'
import { Constants } from '../../constants'

export const StepType = props => {
  const onChange = ev => {
    props.setNewEvent(prev => ({ ...prev, type: ev.target.value }))
    if (ev.target.value !== '')
      props.setStepsVisited(prev => ({ ...prev, type: true }))
    else props.setStepsVisited(prev => ({ ...prev, type: false }))
  }

  return (
    <>
      <p className='text-3xl text-center'>{Constants.QUESTION_STEP_TYPE}</p>
      <Select
        {...props.form}
        defaultSelectedKeys={[props.type]}
        onChange={onChange}
        defaultOpen={!props.type}
        label='Type of event'
        className='max-w-xs'
      >
        {Constants.EVENT_TYPES.map(type => (
          <SelectItem key={type} value={type}>
            {type}
          </SelectItem>
        ))}
      </Select>
    </>
  )
}
