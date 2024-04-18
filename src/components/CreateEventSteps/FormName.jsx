import React from 'react'
import { Input } from '@nextui-org/react'
import { useFormContext } from 'react-hook-form'
import Constants from '../../constants'

export const FormName = () => {
  const {
    register,
    clearErrors,
    watch,
    formState: { errors }
  } = useFormContext()

  return (
    <Input
      {...register('name', { required: true, minLength: 5, maxLength: 20 })}
      value={watch('name')}
      onInput={() => clearErrors('name')}
      label='Name'
      isInvalid={errors.name ? true : false}
      errorMessage={errors.name && Constants.STEP_NAME_ERROR}
    />
  )
}
