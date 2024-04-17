import { Button } from '@nextui-org/react'
import { FormProvider, useForm } from 'react-hook-form'
import { dateToInput } from '../utils/utils'
import {
  FormAddress,
  FormAssistants,
  FormDate,
  FormDescription,
  FormImage,
  FormName,
  FormType
} from './CreateEventSteps'
import assets from '../assets'
import useUpdateEvent from '../hooks/useUpdateEvent'
import { useDispatch, useSelector } from 'react-redux'
import { getUserById } from '../utils/httpUtils'
import { updateUserEvents } from '../redux/userSlice'

const EditEvent = ({ event, setIsEditing, setEvent }) => {
  const user = useSelector(state => state.user)
  const { updateEventAsync, isLoading } = useUpdateEvent()
  const dispatch = useDispatch()

  const form = useForm({
    defaultValues: {
      ...event,
      date: dateToInput(event.date),
      image: { url: event.image }
    }
  })

  const onSubmit = async data => {
    console.log(data)
    const updatedEvent = await updateEventAsync(data)
    if (updatedEvent) {
      dispatch(updateUserEvents(updatedEvent))
      setEvent(updatedEvent)
    }
    setIsEditing(false)
  }

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col gap-5'
      >
        <img
          onClick={() => setIsEditing(false)}
          className='w-5 cursor-pointer self-end'
          src={assets.exit}
          alt='Exit'
        />
        <div className='flex justify-center'>
          <FormImage />
        </div>
        <div className='flex flex-col md:flex-row md:justify-between gap-5'>
          <div className='flex flex-col flex-grow'>
            <FormName />
          </div>
          <div className='flex flex-col flex-grow'>
            <FormDate />
          </div>
        </div>
        <div className='flex flex-col md:flex-row md:justify-between gap-5'>
          <div className='flex flex-col flex-grow'>
            <FormType />
          </div>
          <div className='flex flex-col flex-grow'>
            <FormAssistants />
          </div>
        </div>

        <FormAddress />
        <FormDescription />
        <div className='flex justify-end'>
          <Button isLoading={isLoading} type='submit' color='primary'>
            Save
          </Button>
        </div>
      </form>
    </FormProvider>
  )
}

export default EditEvent
