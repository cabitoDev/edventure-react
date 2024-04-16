import { Input } from '@nextui-org/react'
import Constants from '../../constants'
import { useFormContext } from 'react-hook-form'
import { useRef } from 'react'

export const StepWhen = () => {
  const {
    register,
    setValue,
    clearErrors,
    watch,
    formState: { errors }
  } = useFormContext()

  const timeRef = useRef(null)

  const onChangeTime = event => {
    let inputTime = event.target.value
    if (inputTime.length < watch('time').length) {
      clearErrors('time')
      setValue('time', inputTime)

      return
    }
    const regex = /^(?:[01]?[0-9]|2[0-3]|):?[0-5]?[0-9]?$/
    if (regex.test(inputTime) || inputTime === '') {
      if (inputTime.length === 2) {
        inputTime = inputTime.concat(':')
      }
      clearErrors('time')

      setValue('time', inputTime)
    }
  }
  const onChangeDate = event => {
    let inputDate = event.target.value

    if (inputDate.length < watch('date').length) {
      clearErrors('date')
      setValue('date', inputDate)
      return
    }

    const regex =
      /^(0?[1-9]|[12][0-9]|3[01])?(\/(0?[1-9]|1[0-2])?)?(\/(\d{0,4}))?$/

    if (regex.test(inputDate) || inputDate === '') {
      if (inputDate.length === 2 || inputDate.length === 5) {
        inputDate = inputDate.concat('/')
      }
      clearErrors('date')
      setValue('date', inputDate)
      if (inputDate.length === 10) timeRef.current.click()
    }
  }
  const validateDate = value => {
    const currentDate = new Date()
    const selectedDate = new Date(value)
    return selectedDate > currentDate
  }
  return (
    <>
      <div className='flex gap-2'>
        <Input
          autoFocus
          type='text'
          {...register('date', {
            required: true,
            minLength: 10,
            validate: validateDate
          })}
          value={watch('date') || ''}
          onChange={onChangeDate}
          placeholder='MM/DD/YYYY'
          label='Date:'
          isInvalid={errors.date ? true : false}
          errorMessage={errors.date ? Constants.STEP_DATE_ERROR : ''}
        />
        <Input
          innerWrapperRef={timeRef}
          type='text'
          {...register('time', { required: true, minLength: 5 })}
          value={watch('time') || ''}
          onChange={onChangeTime}
          placeholder='HH:MM'
          label='Time:'
          isInvalid={errors.time ? true : false}
          errorMessage={errors.time ? Constants.STEP_TIME_ERROR : ''}
        />
      </div>
    </>
  )
}
