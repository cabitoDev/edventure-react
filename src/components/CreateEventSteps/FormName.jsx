import React from 'react'
import { Input } from '@nextui-org/react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

const FormName = () => {
  const {
    register,
    clearErrors,
    watch,
    formState: { errors }
  } = useFormContext()
  const { t } = useTranslation('edventure')

  return (
    <Input
      data-testid={'INPUT_NAME'}
      {...register('name', { required: true, minLength: 5, maxLength: 20 })}
      value={watch('name')}
      onInput={() => clearErrors('name')}
      label={t('NAME')}
      isInvalid={errors.name ? true : false}
      errorMessage={errors.name && t('ERROR_NAME')}
    />
  )
}
export default FormName
