import { Input } from '@nextui-org/react'
import Constants from '../../constants'
import { useFormContext } from 'react-hook-form'
import { validateDate } from '../../utils/utils'

export const StepWhen = () => {
  const {
    register,
    clearErrors,
    watch,
    formState: { errors }
  } = useFormContext()

  return (
    <Input
      type='datetime-local'
      autoFocus
      {...register('date', {
        validate: validateDate
      })}
      value={watch('date')}
      onInput={() => clearErrors()}
      isInvalid={errors.date ? true : false}
      errorMessage={errors.date ? Constants.STEP_DATE_ERROR : ''}
    />
  )
}
