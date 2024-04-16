import React from 'react'
import { Input } from '@nextui-org/react'
import { useFormContext } from 'react-hook-form'
import Constants from '../../constants'

export const StepDescription = () => {
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
    setValue('description', newValue)
  }

  return (
    <div className='flex input-width'>
      <Input
        {...register('description', {
          required: true,
          minLength: 20,
          maxLength: 50
        })}
        value={watch('description') || ''}
        onChange={handleInputChange}
        autoFocus
        placeholder='Type a description'
        className='max-w-xs'
        isInvalid={errors.description ? true : false}
        errorMessage={
          errors.description ? Constants.STEP_DESCRIPTION_ERROR : ''
        }
      />
    </div>
  )
}
