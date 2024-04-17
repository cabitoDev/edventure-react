import React from 'react'
import { Textarea } from '@nextui-org/react'
import { useFormContext } from 'react-hook-form'
import Constants from '../../constants'

export const FormDescription = props => {
  const {
    register,
    clearErrors,
    watch,
    formState: { errors }
  } = useFormContext()

  return (
    <Textarea
      classNames={props.className}
      label='Description'
      {...register('description', {
        required: true,
        minLength: 20,
        maxLength: 100
      })}
      value={watch('description')}
      onInput={() => clearErrors('description')}
      className={props.className}
      isInvalid={errors.description ? true : false}
      errorMessage={errors.description && Constants.STEP_DESCRIPTION_ERROR}
    />
  )
}
