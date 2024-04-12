import { Input } from '@nextui-org/react'
import { Constants } from '../../constants'

export const StepName = props => {
  const onChange = ev => {
    props.setNewEvent(prev => ({ ...prev, name: ev.target.value }))
    if (ev.target.value.length > 4) {
      props.setStepsVisited(prev => ({ ...prev, name: true }))
    } else {
      props.setStepsVisited(prev => ({ ...prev, name: false }))
    }
  }
  return (
    <>
      <p className='text-3xl text-center'>{Constants.QUESTION_STEP_NAME}</p>
      <Input
        autoFocus
        placeholder='Type a name (5 char min)'
        value={props.name}
        onChange={onChange}
        className='max-w-xs'
      />
    </>
  )
}
