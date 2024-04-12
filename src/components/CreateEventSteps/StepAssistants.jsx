import { Select, SelectItem } from '@nextui-org/react'
import { Constants } from '../../constants'
export const StepAssistants = props => {
  const onChange = ev => {
    props.setNewEvent(prev => ({ ...prev, assistants: ev.target.value }))
    if (ev.target.value !== '')
      props.setStepsVisited(prev => ({ ...prev, assistants: true }))
    else props.setStepsVisited(prev => ({ ...prev, assistants: false }))
  }
  return (
    <>
      <p className='text-3xl text-center'>
        {Constants.QUESTION_STEP_ASSISTANTS}
      </p>
      <Select
        defaultSelectedKeys={[props.type]}
        defaultOpen={!props.assistants}
        label='Number of assistants'
        className='max-w-xs'
        onChange={onChange}
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
