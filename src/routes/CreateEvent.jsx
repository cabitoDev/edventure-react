import { Button } from '@nextui-org/button'
import { useForm, FormProvider } from 'react-hook-form'

import assets from '../assets'
import { ProgressBar } from '../components/ProgressBar'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Constants } from '../constants'
import { useDispatch, useSelector } from 'react-redux'
import { steps } from '../components/CreateEventSteps/steps'
import { getNewEventRequest } from '../utils/utils'
import { getUserById, saveEvent } from '../utils/httpUtils'
import { updateUser } from '../redux/userSlice'

export const CreateEvent = () => {
  const form = useForm({
    defaultValues: { image: Constants.DEFAULT_EVENT_IMAGE_URL }
  })
  const navigateTo = useNavigate()
  const user = useSelector(state => state.user)
  const [indexStep, setIndexStep] = useState(0)
  const [sendingEvent, setSendingEvent] = useState(false)
  const dispatch = useDispatch()

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

  const onSubmit = () => {
    form.trigger().then(isValid => {
      if (isValid) {
        setSendingEvent(true)
        saveEvent(getNewEventRequest(form.getValues(), user.id)).then(
          async res => {
            await getUserById(user.id)
              .then(newUserData => {
                dispatch(updateUser(newUserData))
                navigateTo('/my-events')
              })
              .catch(error => {
                //handleError
                console.error('Error:', error.message)
              })
          }
        )
      }
    })
  }

  const onError = errors => {
    console.error('Validation errors:', errors)
  }

  return (
    <FormProvider className='center flex' {...form}>
      <form
        onSubmit={e => {
          e.preventDefault()
          indexStep < 6 ? handleNextStep() : onSubmit()
        }}
        className='flex justify-center'
      >
        <div className='center flex-column mg-top-bt max-width-90'>
          <div className=' flex-column gap-5 items-center'>
            <p className='text-3xl text-center'>{steps[indexStep].title}</p>
            {steps[indexStep].component}
          </div>
          <div className='flex bottom-20 absolute w-10/12 gap-4 flex-col'>
            <div className='flex justify-between w-full flex-row-reverse'>
              {indexStep > 0 && (
                <Button
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
        </div>
      </form>
    </FormProvider>
  )
}
