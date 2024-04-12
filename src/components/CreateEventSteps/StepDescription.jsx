import { Input } from '@nextui-org/react'
import { Constants } from '../../constants'

export const StepDescription = props => {
  const onChange = ev => {
    props.setNewEvent(prev => ({ ...prev, description: ev.target.value }))
    if (ev.target.value.length > 20) {
      props.setStepsVisited(prev => ({ ...prev, description: true }))
    } else {
      props.setStepsVisited(prev => ({ ...prev, description: false }))
    }
  }
  return (
    <>
      <p className='text-3xl text-center'>
        {Constants.QUESTION_STEP_DESCRIPTION}
      </p>
      <Input
        autoFocus
        name='description'
        {...props.form}
        placeholder='Put a description of your event (20 char min)'
        className='max-w-xs'
        value={props.description}
        onChange={onChange}
      />
    </>
  )
}
