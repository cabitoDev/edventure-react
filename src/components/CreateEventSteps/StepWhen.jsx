import { Input } from '@nextui-org/react'
import { Constants } from '../../constants'

export const StepWhen = props => {
  const onChangeTime = event => {
    let inputTime = event.target.value
    if (inputTime.length < props.time.length) {
      props.setNewEvent(prev => ({ ...prev, time: inputTime }))
      props.setStepsVisited(prev => ({ ...prev, date: false }))

      return
    }
    const regex = /^(?:[01]?[0-9]|2[0-3]|):?[0-5]?[0-9]?$/
    if (regex.test(inputTime) || inputTime === '') {
      if (inputTime.length === 2) {
        inputTime = inputTime.concat(':')
      }
      props.setNewEvent(prev => ({ ...prev, time: inputTime }))
      if ((inputTime + props.date).length === 15)
        props.setStepsVisited(prev => ({ ...prev, date: true }))
      else props.setStepsVisited(prev => ({ ...prev, date: false }))
    }
  }
  const onChangeDate = event => {
    let inputDate = event.target.value

    if (inputDate.length < props.date.length) {
      props.setNewEvent(prev => ({ ...prev, date: inputDate }))
      props.setStepsVisited(prev => ({ ...prev, date: false }))
      return
    }

    const regex =
      /^(0?[1-9]|[12][0-9]|3[01])?(\/(0?[1-9]|1[0-2])?)?(\/(\d{0,4}))?$/

    if (regex.test(inputDate) || inputDate === '') {
      if (inputDate.length === 2 || inputDate.length === 5) {
        inputDate = inputDate.concat('/')
      }
      props.setNewEvent(prev => ({ ...prev, date: inputDate }))
      if ((inputDate + props.time).length === 15)
        props.setStepsVisited(prev => ({ ...prev, date: true }))
      else props.setStepsVisited(false)
    }
  }
  return (
    <>
      <p className='text-3xl text-center'>{Constants.QUESTION_STEP_WHEN}</p>
      <div className='flex gap-2'>
        <Input
          autoFocus
          type='text'
          value={props.date}
          onChange={onChangeDate}
          placeholder='DD/MM/YYYY'
          label='Date:'
        />
        <Input
          type='text'
          value={props.time}
          onChange={onChangeTime}
          placeholder='HH:MM'
          label='Time:'
        />
      </div>
    </>
  )
}
