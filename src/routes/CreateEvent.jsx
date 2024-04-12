import { Button } from '@nextui-org/button'
import { useForm, FormProvider } from "react-hook-form"
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
import {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { Constants } from '../constants'
import { useSelector } from 'react-redux'
import { TransitionAnimation } from '../components/TransitionAnimation'
 
const formSteps = {
  name: 0,
  type: 1,
}
 
const steps = {
  0: {
    title: 'What is your event name?',
    description: 'Enter your event name',
    component: <StepName />,
    next: 'type',
  },
  1: {
    title: 'What is your type?',
    description: 'Enter your type',
    component: <StepType />,
    next: 'image',
    previous: 'name',
  }
};
 
const defaultValues = {
  name: '',
  type: ''
}
 
export const CreateEvent = () => {
  const form = useForm()
  const navigateTo = useNavigate()
  const state = useSelector(state => state)
  const [indexStep, setIndexStep] = useState(formSteps.name)
  const [newEvent, setNewEvent] = useState({
    image: Constants.DEFAULT_EVENT_IMAGE_URL,
    date: '',
    time: ''
  })
  const [sendingEvent, setSendingEvent] = useState(false)
 
  const handleNextStep = () => {
  const currentFields = steps[indexStep].validationFields;
 
  form.trigger().then(isValid => {
    if (isValid) {
      if (indexStep < 6) {
        setIndexStep(prevStep => prevStep + 1);
      }
    }
    });
  };
 
  const handlePrevStep = () => {
    if (indexStep > 0) {
      setIndexStep(prevIndex => prevIndex - 1)
    }
  }
 
  const onSubmit = data => {
//    setSendingEvent(true);
    console.log("Final data:", data);
  };
 
  const onError = errors => {
    console.error('Validation errors:', errors);
  };
 
  return (
<FormProvider {...form}>
<form onSubmit={form.handleSubmit(onSubmit, onError)}>
<div className='center flex-column mg-top-bt max-width-90'>
<TransitionAnimation>
<div className=' flex-column gap-5 items-center'>
<p className='text-3xl text-center'>{steps[indexStep].title}</p>
              {steps[indexStep].component}
</div>
</TransitionAnimation>
 
          <div className='flex bottom-20 absolute w-10/12 gap-4 flex-col'>
<div className='flex justify-between w-full flex-row-reverse'>
              {indexStep > 0 && (
<Button
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
</form>
</FormProvider>
    )
}