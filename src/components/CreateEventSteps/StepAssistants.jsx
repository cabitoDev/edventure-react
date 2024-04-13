import { Select, SelectItem } from '@nextui-org/react'
import { Constants } from '../../constants'
import { useFormContext } from 'react-hook-form'

export const StepAssistants = () => {
  const {
    register,
    setValue,
    clearErrors,
    watch,
    formState: { errors }
  } = useFormContext()

  const onSelectChange = ev => {
    const newValue = ev.target.value
    clearErrors()
    setValue('assistants', newValue)
  }

  return (
    <Select
      {...register('assistants', { required: true })}
      defaultSelectedKeys={[watch('assistants')]}
      onChange={onSelectChange}
      defaultOpen={!watch('assistants')}
      label='Number of assistants'
      className='max-w-xs'
      isInvalid={errors.assistants ? true : false}
      errorMessage={errors.assistants ? Constants.STEP_ASSISTANTS_ERROR : ''}
    >
      {Constants.ASSISTANTS_NUMBER.map(assistants => (
        <SelectItem key={assistants} value={assistants}>
          {assistants}
        </SelectItem>
      ))}
    </Select>
  )
}
