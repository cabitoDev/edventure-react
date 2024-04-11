import { TransitionAnimation } from '../TransitionAnimation'

export const Step = props => {
  return (
    <TransitionAnimation>
      <p className='text-3xl text-center'>{props.text}</p>
      {props.children}
    </TransitionAnimation>
  )
}
