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
import { Progress } from 'flowbite-react'
import assets from '../assets'
import { ProgressBar } from '../components/ProgressBar'

export const CreateEvent = () => {
  const onStepChange = () => {
    console.log('Step Changed')
  }

  return (
    <>
      <StepsProvider>
        <StepsComponent onStepChange={onStepChange} />
      </StepsProvider>
    </>
  )
}

export const StepsComponent = props => {
  const { prev, next, progress, jump, total, current } = useSteps()

  return (
    <div className='center flex-column mg-top-bt max-width-90'>
      <Steps onStepChange={props.onStepChange}>
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
      <div className='sm:bottom-40 md:bottom-40 bottom-60 absolute w-8/12 gap-4 flex flex-col'>
        <div className='flex place-content-between'>
          <Button radius='full' isIconOnly onClick={prev}>
            <img src={assets.arrowLeft} />
          </Button>
          <Button radius='full' isIconOnly onClick={next}>
            <img src={assets.arrowRight} />
          </Button>
        </div>
        <ProgressBar progress={progress} />
      </div>
    </div>
  )
}
