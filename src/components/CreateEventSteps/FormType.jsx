import { Select, SelectItem } from '@nextui-org/react'
import Constants from '../../constants'
import { useFormContext } from 'react-hook-form'
import React from 'react'
import { useTranslation } from 'react-i18next'

const FormType = () => {
  const {
    register,
    clearErrors,
    watch,
    formState: { errors }
  } = useFormContext()
  const { t } = useTranslation('edventure')

  return (
    <Select
      data-testid={'SELECT_TYPE'}
      {...register('type', { required: true })}
      defaultSelectedKeys={[watch('type')]}
      defaultOpen={!watch('type')}
      label={t('EVENT_TYPE')}
      onClick={() => clearErrors('type')}
      isInvalid={errors.type ? true : false}
      errorMessage={errors.type && t('ERROR_TYPE')}
    >
      {Constants.EVENT_TYPES.map(type => (
        <SelectItem data-testid={type} key={type} value={type}>
          {t(type)}
        </SelectItem>
      ))}
    </Select>
  )
}
export default FormType
