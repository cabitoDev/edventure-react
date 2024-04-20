import PropTypes from 'prop-types'
import { Input } from '@nextui-org/react'
import Constants from '../../constants'
import { useFormContext } from 'react-hook-form'
import { validateDate } from '../../utils'
import React from 'react'

const FormDate = () => {
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
        required: true,
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
export default FormDate
