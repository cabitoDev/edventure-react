import { Select, SelectItem } from '@nextui-org/react'
import Constants from '../../constants'
import { useFormContext } from 'react-hook-form'

export const FormAssistants = props => {
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
      label='Number of assistants'
      className={props.className}
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
