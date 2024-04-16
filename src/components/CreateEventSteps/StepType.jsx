import { Select, SelectItem } from '@nextui-org/react'
import Constants from '../../constants'
import { useFormContext } from 'react-hook-form'

export const StepType = () => {
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
    setValue('type', newValue)
  }

  return (
    <Select
      {...register('type', { required: true })}
      defaultSelectedKeys={[watch('type')]}
      onChange={onSelectChange}
      defaultOpen={!watch('type')}
      label='Type of event'
      className='max-w-xs'
      isInvalid={errors.type ? true : false}
      errorMessage={errors.type ? Constants.STEP_TYPE_ERROR : ''}
    >
      {Constants.EVENT_TYPES.map(type => (
        <SelectItem key={type} value={type}>
          {type}
        </SelectItem>
      ))}
    </Select>
  )
}
