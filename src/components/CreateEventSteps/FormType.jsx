import { Select, SelectItem } from '@nextui-org/react'
import Constants from '../../constants'
import { useFormContext } from 'react-hook-form'
import React from 'react'

const FormType = () => {
  const {
    register,
    clearErrors,
    watch,
    formState: { errors }
  } = useFormContext()

  return (
    <Select
      {...register('type', { required: true })}
      defaultSelectedKeys={[watch('type')]}
      defaultOpen={!watch('type')}
      label='Type of event'
      onClick={() => clearErrors('type')}
      isInvalid={errors.type ? true : false}
      errorMessage={errors.type && Constants.STEP_TYPE_ERROR}
    >
      {Constants.EVENT_TYPES.map(type => (
        <SelectItem key={type} value={type}>
          {type}
        </SelectItem>
      ))}
    </Select>
  )
}
export default FormType
