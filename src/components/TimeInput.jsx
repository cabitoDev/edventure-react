import { useState } from 'react'
import { Input } from '@nextui-org/react'

export const TimeInput = () => {
  const [time, setTime] = useState('')
  const [date, setDate] = useState('')

  const handleTimeChange = event => {
    const inputTime = event.target.value

    const regex = /^(?:[01]?[0-9]|2[0-3]|):?[0-5]?[0-9]?$/

    if (regex.test(inputTime) || inputTime === '') {
      setTime(prev => {
        if (prev.length > inputTime.length) {
          return inputTime
        }
        if (inputTime.length > 2 && !inputTime.includes(':')) {
          return inputTime.substring(0, 2) + ':' + inputTime.substring(2)
        } else {
          return inputTime
        }
      })
    }
  }
  const handleDateChange = event => {
    const inputDate = event.target.value
    if (isNaN(event.target.value[event.target.value.length - 1])) return
    const regex =
      /^(0?[1-9]|[12][0-9]|3[01])?(\/(0?[1-9]|1[0-2])?)?(\/(\d{0,4}))?$/

    if (regex.test(inputDate) || inputDate === '') {
      setDate(prev => {
        const formatedDate = inputDate.replace(/\D/g, '')
        if (prev.length > inputDate.length) {
          return inputDate
        }
        if (formatedDate.length === 2 || formatedDate.length === 4) {
          return inputDate + '/'
        } else {
          return inputDate
        }
      })
    }
  }
  return (
    <div className='flex gap-2'>
      <Input
        autoFocus
        type='text'
        value={date}
        on
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
