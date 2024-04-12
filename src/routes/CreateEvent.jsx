import { Button } from '@nextui-org/button'
import {
  StepName,
  StepType,
  StepWhen,
  StepWhere,
  StepAssistants,
  StepDescription
} from '../components/CreateEventSteps'

import assets from '../assets'
import { ProgressBar } from '../components/ProgressBar'
import { StepImage } from '../components/CreateEventSteps/StepImage'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Constants } from '../constants'
import { useSelector } from 'react-redux'
import { TransitionAnimation } from '../components/TransitionAnimation'

export const CreateEvent = () => {
  const steps = [
    'name',
    'type',
    'image',
    'date',
    'address',
    'assistants',
    'description'
  ]
  const navigateTo = useNavigate()
  const state = useSelector(state => state)
  const [indexStep, setIndexStep] = useState(0)
  const [newEvent, setNewEvent] = useState({
    image: Constants.DEFAULT_EVENT_IMAGE_URL,
    date: '',
    time: ''
  })
  const [sendingEvent, setSendingEvent] = useState(false)
  const [stepsVisited, setStepsVisited] = useState({ image: true })

  const handleNextStep = () => {
    if (indexStep < 6) {
      const newIndex = indexStep + 1
      setIndexStep(newIndex)
      return
    }
    setSendingEvent(true)
    fetch(Constants.EVENTS_ENDPOINT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        getNewEventRequest(state.event, state.user.userInfo.id)
      )
    })
      .then(async res => {
        await getUserById(state.user.userInfo.id)
          .then(newUserData => {
            dispatch(loginSuccess(newUserData))
            navigateTo('/my-events')
          })
          .catch(error => {
            //handleError
            console.error('Error:', error.message)
          })
      })
      .catch(error => {
        console.error('Error al realizar la solicitud:', error)
      })
  }

  const handlePrevStep = () => {
    if (indexStep > 0) {
      setIndexStep(prevIndex => prevIndex - 1)
    }
  }

  const renderSwitch = index => {
    switch (index) {
      case 0:
        return (
          <StepName
            setStepsVisited={setStepsVisited}
            setNewEvent={setNewEvent}
            name={newEvent.name}
          />
        )
      case 1:
        return (
          <StepType
            setStepsVisited={setStepsVisited}
            type={newEvent.type}
            setNewEvent={setNewEvent}
          />
        )
      case 2:
        return (
          <StepImage
            setStepsVisited={setStepsVisited}
            image={newEvent.image}
            setNewEvent={setNewEvent}
          />
        )
      case 3:
        return (
          <StepWhen
            setNewEvent={setNewEvent}
            date={newEvent.date}
            time={newEvent.time}
            setStepsVisited={setStepsVisited}
          />
        )
      case 4:
        return (
          <StepWhere
            setNewEvent={setNewEvent}
            address={newEvent.address}
            setStepsVisited={setStepsVisited}
          />
        )
      case 5:
        return (
          <StepAssistants
            setNewEvent={setNewEvent}
            assistants={newEvent.assistants}
            setStepsVisited={setStepsVisited}
          />
        )
      case 6:
        return (
          <StepDescription
            setNewEvent={setNewEvent}
            description={newEvent.description}
            setStepsVisited={setStepsVisited}
          />
        )
    }
  }

  return (
    <div className='center flex-column mg-top-bt max-width-90'>
      <TransitionAnimation>
        <div className=' flex-column gap-5 items-center'>
          {renderSwitch(indexStep)}
        </div>
      </TransitionAnimation>

      <div className='flex bottom-20 absolute w-10/12 gap-4 flex-col'>
        <div className='flex justify-between w-full flex-row-reverse'>
          {indexStep > 0 && (
            <Button
              isDisabled={sendingEvent}
              color='primary'
              radius='full'
              isIconOnly
              onClick={handlePrevStep}
            >
              <img src={assets.arrowLeft} />
            </Button>
          )}

          <Button
            isLoading={sendingEvent}
            isDisabled={!stepsVisited[steps[indexStep]]}
            className='order-first child-color-white'
            color='success'
            radius='full'
            isIconOnly
            onClick={handleNextStep}
            onKeyDown={event => {
              if (event.key === 'Enter') handleNextStep()
            }}
            type='submit'
          >
            <img src={indexStep < 6 ? assets.arrowRight : assets.check} />
          </Button>
        </div>
        <ProgressBar progress={indexStep / 6} />
      </div>
    </div>
  )
}
