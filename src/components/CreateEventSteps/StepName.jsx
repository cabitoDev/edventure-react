import React from 'react'
import { Card, Input } from '@nextui-org/react'
import { useFormContext } from 'react-hook-form'
import { Constants } from '../../constants'

export const StepName = () => {
  const {
    register,
    setValue,
    clearErrors,
    watch,
    formState: { errors }
  } = useFormContext()

  const handleInputChange = e => {
    const newValue = e.target.value
    clearErrors()
    console.log(errors)
    setValue('name', newValue)
  }

  return (
    <div>
      <Input
        {...register('name', { required: true, minLength: 5, maxLength: 20 })}
        value={watch('name') || ''}
        onChange={handleInputChange}
        autoFocus
        placeholder='Type a name'
        className='max-w-xs'
        isInvalid={errors.name ? true : false}
        errorMessage={errors.name ? Constants.STEP_NAME_ERROR : ''}
      />
    </div>
  )
}
