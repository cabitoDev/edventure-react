import { Steps, StepsProvider, useSteps } from 'react-step-builder'
import { Button } from '@nextui-org/button'
import { StepName } from '../components/CreateEventSteps/StepName'
import { StepType } from '../components/CreateEventSteps/StepType'
import { StepWhen } from '../components/CreateEventSteps/StepWhen'
import { StepWhere } from '../components/CreateEventSteps/StepWhere'
import { StepAssistants } from '../components/CreateEventSteps/StepAssistants'
import { StepDescription } from '../components/CreateEventSteps/StepDescription'
import { Step } from '../components/CreateEventSteps/Step'
import { Constants } from '../constants'
import assets from '../assets'
import { ProgressBar } from '../components/ProgressBar'
import { useSelector } from 'react-redux'
import { StepImage } from '../components/CreateEventSteps/StepImage'
import { useState } from 'react'

export const CreateEvent = () => {
  return (
    <>
      <StepsProvider>
        <StepsComponent />
      </StepsProvider>
    </>
  )
}

export const StepsComponent = props => {
  const [sendingEvent, setSendingEvent] = useState(false)
  const nextStepAvailable = useSelector(state => {
    return state.nextStep
  })
  const { prev, next, progress } = useSteps()

  return (
    <div className='center flex-column mg-top-bt max-width-90'>
      <Steps>
        <Step text={Constants.QUESTION_STEP_NAME}>
          <StepName />
        </Step>
        <Step text={Constants.QUESTION_STEP_TYPE}>
          <StepType />
        </Step>
        <Step text={Constants.QUESTION_STEP_IMAGE}>
          <StepImage />
        </Step>
        <Step text={Constants.QUESTION_STEP_WHEN}>
          <StepWhen />
        </Step>
        <Step text={Constants.QUESTION_STEP_WHERE}>
          <StepWhere />
        </Step>
        <Step text={Constants.QUESTION_STEP_ASSISTANTS}>
          <StepAssistants />
        </Step>
        <Step text={Constants.QUESTION_STEP_DESCRIPTION}>
          <StepDescription />
        </Step>
      </Steps>
      <div className='flex bottom-20 absolute w-10/12 gap-4 flex-col'>
        <div className='flex justify-between w-full flex-row-reverse'>
          {progress > 0 && (
            <Button color='primary' radius='full' isIconOnly onClick={prev}>
              <img src={assets.arrowLeft} />
            </Button>
          )}

          <Button
          isLoading={sendingEvent}
            isDisabled={!nextStepAvailable}
          
            className='order-first child-color-white'
            color='success'
            radius='full'
            isIconOnly
            onClick={()=>{progress<1? next() : setSendingEvent(true)}}
            onKeyDown={event => {
              console.log(progress)
              if (event.key === 'Enter') next()
            }}
          >
            <img src={progress<1? assets.arrowRight : assets.check} />
          </Button>
        </div>
        <ProgressBar progress={progress} />
      </div>
    </div>
  )
}
