import { Input } from '@nextui-org/react'
import { TransitionAnimation } from '../TransitionAnimation'
import { Constants } from '../../constants'

export const StepName = (props) => {
  // const event = useSelector(state => state.event)
  // const dispatch = useDispatch()

  // const handleChange = event => {
  //   dispatch(nameUpated(event.target.value))
  //   if (event.target.value === '') {
  //     dispatch(nextStepAvailable(false))
  //     return
  //   }
  //   if (!event.nextStep) dispatch(nextStepAvailable(true))
  // }

  return (
    <TransitionAnimation>
      <p className='text-3xl text-center'>{Constants.QUESTION_STEP_NAME}</p>
    <Input
      autoFocus
      placeholder='Type a name'
      className='max-w-xs'
      value={props.name}
      onChange={props.onChange}
    />
    </TransitionAnimation>
  )
}
