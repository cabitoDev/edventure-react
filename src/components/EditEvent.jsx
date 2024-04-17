import { Avatar, Button, Input, Textarea } from '@nextui-org/react'
import { useForm } from 'react-hook-form'
import Constants from '../constants'
import { validateDate } from '../utils/utils'

const EditEvent = ({ event, setIsEditing }) => {
  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors }
  } = useForm()

  const onSubmit = async data => {
    console.log(data)
    // const updatedUser = await updateEvent(data)
    // if (!updatedUser) {
    //   alert('Error updating user')
    // }
    // setIsEditing(false)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex-column gap-5'>
      <div className='center'>
        <Avatar src={event.image} alt='Event Image' className='w-24 h-24' />
      </div>

      <div className='flex justify-between'>
        <Input
          {...register('name', { required: true, minLength: 5, maxLength: 20 })}
          isInvalid={errors.name ? true : false}
          defaultValue={event.name}
          errorMessage={errors.name && Constants.STEP_NAME_ERROR}
          label='Name'
          onChange={() => clearErrors('name')}
          labelPlacement='outside-left'
        />
        <Input
          type='datetime-local'
          defaultValue={new Date(event.date).toISOString().slice(0, 16)}
          {...register('date', { validate: validateDate })}
          isInvalid={errors.date ? true : false}
          errorMessage={errors.date && Constants.STEP_DATE_ERROR}
          labelPlacement='outside-left'
          label='Date'
        />
      </div>
      <Textarea
        {...register('description', {
          required: true,
          minLength: 20,
          maxLength: 100
        })}
        isInvalid={errors.description ? true : false}
        defaultValue={event.description}
        errorMessage={errors.description && Constants.STEP_DESCRIPTION_ERROR}
        onChange={() => clearErrors('description')}
        label='Description'
      />
      <input
        type='text'
        id='eventAddress'
        name='eventAddress'
        defaultValue={event.address}
        className='rounded-md p-2'
      />

      <div className='flex justify-end'>
        <Button type='submit' color='primary'>
          Save
        </Button>
      </div>
    </form>
  )
}

export default EditEvent
