import PropTypes from 'prop-types'
import { Input } from '@nextui-org/react'
import Constants from '../../constants'
import { useFormContext } from 'react-hook-form'
import { validateDate } from '../../utils/utils'
import React from 'react'

export const FormDate = () => {
  const {
    register,
    clearErrors,
    watch,
    formState: { errors }
  } = useFormContext()

  return (
    <Input
      label='Date'
      placeholder=' '
      type='datetime-local'
      {...register('date', {
        validate: validateDate
      })}
      value={watch('date')}
      onInput={() => clearErrors()}
      isInvalid={errors.date ? true : false}
      errorMessage={errors.date && Constants.STEP_DATE_ERROR}
    />
  )
}

FormDate.propTypes = {
  className: PropTypes.string
}
