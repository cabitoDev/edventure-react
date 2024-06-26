import { Button } from '@nextui-org/button'
import { useForm, FormProvider } from 'react-hook-form'
import assets from '../../public/assets'
import { ProgressBar, TransitionAnimation, steps } from '../components'
import React, { useId, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Constants from '../constants'
import { useSelector } from 'react-redux'
import { getNewEventRequest, uploadImage, generateRandomNumber } from '../utils'
import { useTranslation } from 'react-i18next'
import { useFetch } from '../hooks'

const CreateEvent = () => {
  const { t } = useTranslation('edventure')
  const { httpPost } = useFetch()
  const form = useForm({
    defaultValues: { image: { url: Constants.DEFAULT_EVENT_IMAGE_URL } }
  })
  const navigateTo = useNavigate()
  const user = useSelector(state => state.user)
  const [indexStep, setIndexStep] = useState(0)
  const [sendingEvent, setSendingEvent] = useState(false)

  const handleNextStep = () => {
    form.trigger().then(isValid => {
      if (isValid) {
        if (indexStep < 6) {
          setIndexStep(prevStep => prevStep + 1)
        }
      }
    })
  }

  const handlePrevStep = () => {
    if (indexStep > 0) {
      setIndexStep(prevIndex => prevIndex - 1)
    }
  }

  const onSubmit = async () => {
    const isValid = await form.trigger()
    if (isValid) {
      setSendingEvent(true)
      const imgFile = form.watch('image').file
      const id = generateRandomNumber()
      const newImage = imgFile
        ? await uploadImage('events', id, imgFile)
        : Constants.DEFAULT_EVENT_IMAGE_URL

      const newEvent = await httpPost(
        Constants.EVENTS_ENDPOINT_URL,
        getNewEventRequest(form.getValues(), newImage, user)
      )
      if (newEvent) {
        navigateTo('/my-events')
      } else {
        console.error('Error creating the event')
      }

      setSendingEvent(false)
    }
  }

  return (
    <TransitionAnimation className='gap-md flex-column'>
      <FormProvider className='center flex' {...form}>
        <form
          onSubmit={e => {
            e.preventDefault()
            indexStep < 6 ? handleNextStep() : onSubmit()
          }}
          className='flex-column center w-full'
        >
          <div className='center flex-column mg-top-bt pt-10 max-width-90'>
            <div className='z-40 flex-column gap-5 items-center'>
              <p className='text-3xl text-center'>
                {t(steps[indexStep].title)}
              </p>
              {steps[indexStep].component}
            </div>
          </div>
          <div className='absolute flex px-14 pt-[400px] gap-4 w-full flex-column items-center justify-between max-w-[1024px]'>
            <div className='flex justify-between w-full flex-row-reverse'>
              {indexStep > 0 && (
                <Button
                  data-testid={'BUTTON_BACK'}
                  color='primary'
                  isDisabled={sendingEvent}
                  radius='full'
                  isIconOnly
                  onClick={handlePrevStep}
                >
                  <img src={assets.arrowLeft} />
                </Button>
              )}

              <Button
                data-testid={'BUTTON_NEXT'}
                isLoading={sendingEvent}
                className='order-first child-color-white'
                color='success'
                radius='full'
                isIconOnly
                type='submit'
              >
                <img src={indexStep < 6 ? assets.arrowRight : assets.check} />
              </Button>
            </div>
            <ProgressBar progress={indexStep / 6} />
          </div>
        </form>
      </FormProvider>
    </TransitionAnimation>
  )
}
export default CreateEvent
