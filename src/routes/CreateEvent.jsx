import { Steps, StepsProvider, useSteps } from 'react-step-builder'
import { Button } from '@nextui-org/button'
import { Step1 } from '../components/CreateEventSteps/Step1'
import { Step2 } from '../components/CreateEventSteps/Step2'
import { Step3 } from '../components/CreateEventSteps/Step3'
import { Step4 } from '../components/CreateEventSteps/Step4'
import { Step5 } from '../components/CreateEventSteps/Step5'
import { Step6 } from '../components/CreateEventSteps/Step6'
import { Step } from '../components/CreateEventSteps/Step'
import { Constants } from '../constants'
import assets from '../assets'
import { ProgressBar } from '../components/ProgressBar'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

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
  const nextStepAvailable = useSelector(state => {
    return state.nextStep
  })
  const { prev, next, progress } = useSteps()

  return (
    <div className='center flex-column mg-top-bt max-width-90'>
      <Steps>
        <Step text={Constants.QUESTION_STEP_1}>
          <Step1 />
        </Step>
        <Step text={Constants.QUESTION_STEP_2}>
          <Step2 />
        </Step>
        <Step text={Constants.QUESTION_STEP_3}>
          <Step3 />
        </Step>
        <Step text={Constants.QUESTION_STEP_4}>
          <Step4 />
        </Step>
        <Step text={Constants.QUESTION_STEP_5}>
          <Step5 />
        </Step>
        <Step text={Constants.QUESTION_STEP_6}>
          <Step6 />
        </Step>
      </Steps>
      <div className='flex bottom-40 absolute w-10/12 gap-4 flex-col'>
        <div className='flex justify-between w-full flex-row-reverse'>
          {progress > 0 && (
            <Button color='primary' radius='full' isIconOnly onClick={prev}>
              <img src={assets.arrowLeft} />
            </Button>
          )}

          <Button
            isDisabled={!nextStepAvailable}
            className='order-first'
            color='success'
            radius='full'
            isIconOnly
            onClick={next}
            onKeyDown={event => {
              if (event.key === 'Enter') next()
            }}
          >
            <img src={assets.arrowRight} />
          </Button>
        </div>
        <ProgressBar progress={progress} />
      </div>
    </div>
  )
}
