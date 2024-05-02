import PropTypes from 'prop-types'
import { Input } from '@nextui-org/react'
import { useFormContext } from 'react-hook-form'
import { validateDate } from '../../utils'
import React from 'react'
import { useTranslation } from 'react-i18next'

const FormDate = () => {
  const { t } = useTranslation('edventure')

  const {
    register,
    clearErrors,
    watch,
    formState: { errors }
  } = useFormContext()

  return (
    <Input
      label={t('DATE')}
      placeholder=' '
      type='datetime-local'
      {...register('date', {
        required: true,
        validate: validateDate
      })}
      value={watch('date')}
      onInput={() => clearErrors()}
      isInvalid={errors.date ? true : false}
      errorMessage={errors.date && t('ERROR_DATE')}
    />
  )
}

FormDate.propTypes = {
  className: PropTypes.string
}
export default FormDate
