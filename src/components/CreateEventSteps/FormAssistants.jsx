import { Select, SelectItem } from '@nextui-org/react'
import Constants from '../../constants'
import { useFormContext } from 'react-hook-form'
import React from 'react'
import { useTranslation } from 'react-i18next'

const FormAssistants = () => {
  const { t } = useTranslation('edventure')

  const {
    register,
    clearErrors,
    watch,
    formState: { errors }
  } = useFormContext()

  return (
    <Select
      {...register('assistants', { required: true })}
      defaultSelectedKeys={[watch('assistants')]}
      onClick={() => clearErrors('assistants')}
      defaultOpen={!watch('assistants')}
      label={t('NUMBER_ASSISTANTS')}
      isInvalid={errors.assistants ? true : false}
      errorMessage={errors.assistants && Constants.STEP_ASSISTANTS_ERROR}
    >
      {Constants.ASSISTANTS_NUMBER.map(assistants => (
        <SelectItem key={assistants} value={assistants}>
          {assistants}
        </SelectItem>
      ))}
    </Select>
  )
}
export default FormAssistants
