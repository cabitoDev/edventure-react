import React from 'react'
import { Card, Input } from '@nextui-org/react'
import { useFormContext } from 'react-hook-form'
import Constants from '../../constants'

export const StepName = () => {
  const {
    register,
    clearErrors,
    watch,
    formState: { errors }
  } = useFormContext()

  return (
    <div>
      <Input
        {...register('name', { required: true, minLength: 5, maxLength: 20 })}
        value={watch('name')}
        autoFocus
        onInput={() => clearErrors('name')}
        placeholder='Type a name'
        className='max-w-xs'
        isInvalid={errors.name ? true : false}
        errorMessage={errors.name ? Constants.STEP_NAME_ERROR : ''}
      />
    </div>
  )
}
