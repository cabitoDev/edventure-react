import PropTypes from 'prop-types'
import { Button } from '@nextui-org/react'
import { FormProvider, useForm } from 'react-hook-form'
import { dateToInput } from '../../utils/utils'
import React from 'react'
import {
  FormAddress,
  FormAssistants,
  FormDate,
  FormDescription,
  FormImage,
  FormName,
  FormType
} from '../CreateEventSteps'
import assets from '../../../public/assets'
import useUpdateEvent from '../../hooks/useUpdateEvent'
import { useTranslation } from 'react-i18next'

const EditEvent = ({ event, setIsEditing, setEvent }) => {
  const { updateEventAsync, isLoading } = useUpdateEvent()
  const { t } = useTranslation('edventure')

  const form = useForm({
    defaultValues: {
      ...event,
      date: dateToInput(event.date),
      image: { url: event.image }
    }
  })

  const onSubmit = async data => {
    const updatedEvent = await updateEventAsync(data)
    if (updatedEvent) {
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
          <Button
            data-testid='SAVE'
            isLoading={isLoading}
            type='submit'
            color='primary'
          >
            {t('SAVE')}
          </Button>
        </div>
      </form>
    </FormProvider>
  )
}

EditEvent.propTypes = {
  event: PropTypes.shape({
    date: PropTypes.string,
    image: PropTypes.string
  }),
  setEvent: PropTypes.func,
  setIsEditing: PropTypes.func
}

export default EditEvent
