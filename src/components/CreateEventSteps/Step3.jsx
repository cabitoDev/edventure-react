import { Input } from '@nextui-org/react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { nextStepAvailable } from '../../redux/nextStepSlice'
import { dateUpated } from '../../redux/eventSlice'

export const Step3 = () => {
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')

  const newEvent = useSelector(state => {
    return state.event
  })
  const dispatch = useDispatch()

  useEffect(() => {
    setDate(newEvent.dateTime.date)
    setTime(newEvent.dateTime.time)
  }, [newEvent])

  useEffect(() => {
    if (date.length === 10 && time.length === 5) {
      dispatch(nextStepAvailable(true))
      dispatch(dateUpated({ date: date, time: time }))
      return
    }
    dispatch(nextStepAvailable(false))
  }, [date, time])
  const handleTimeChange = event => {
    if (event.target.value.length < time) {
      setTime(event.target.value)
      return
    }

    let inputTime = event.target.value
    const regex = /^(?:[01]?[0-9]|2[0-3]|):?[0-5]?[0-9]?$/
    if (regex.test(inputTime) || inputTime === '') {
      if (inputTime.length === 2) {
        inputTime = inputTime.concat(':')
      }
      setTime(inputTime)
    }
  }
  const handleDateChange = event => {
    if (event.target.value.length < time) {
      setDate(event.target.value)
      return
    }
    let inputDate = event.target.value

    const regex =
      /^(0?[1-9]|[12][0-9]|3[01])?(\/(0?[1-9]|1[0-2])?)?(\/(\d{0,4}))?$/

    if (regex.test(inputDate) || inputDate === '') {
      if (inputDate.length === 2 || inputDate.length === 5) {
        inputDate = inputDate.concat('/')
      }
      setDate(inputDate)
    }
  }
  return (
    <div className='flex gap-2'>
      <Input
        autoFocus
        type='text'
        value={date}
        onChange={handleDateChange}
        placeholder='DD/MM/YYYY'
        label='Date:'
      />
      <Input
        type='text'
        value={time}
        onChange={handleTimeChange}
        placeholder='HH:MM'
        label='Time:'
      />
    </div>
  )
}
