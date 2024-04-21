import React from 'react'
import { Textarea } from '@nextui-org/react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

const FormDescription = () => {
  const {
    register,
    clearErrors,
    watch,
    formState: { errors }
  } = useFormContext()
  const { t } = useTranslation('edventure')

  return (
    <Textarea
      label={t('DESCRIPTION')}
      {...register('description', {
        required: true,
        minLength: 20,
        maxLength: 100
      })}
      value={watch('description')}
      onInput={() => clearErrors('description')}
      isInvalid={errors.description ? true : false}
      errorMessage={errors.description && t('ERROR_DESCRIPTION')}
    />
  )
}
export default FormDescription
