import { NavBar } from '../components/Navbar/NavBar'
import { Steps, StepsProvider, useSteps } from 'react-step-builder'
import { Button } from '@nextui-org/button'

export const CreateEvent = () => {
  const onStepChange = () => {
    console.log('Step Changed')
  }

  return (
    <>
      <NavBar />
      <StepsProvider>
        <StepsComponent onStepChange={onStepChange} />
      </StepsProvider>
    </>
  )
}

export const StepsComponent = props => {
  const { prev, next, progress, jump, total, current } = useSteps()

  return (
    <>
      <Steps onStepChange={props.onStepChange}>
        <div>
          <h1>Step 1</h1>
          <p>This is Step 1.</p>
        </div>
        <div>
          <h1>Step 2</h1>
          <p>This is Step 2.</p>
        </div>
        <div>
          <h1>Step 3</h1>
          <p>This is Step 3.</p>
        </div>
        <div>
          <h1>Step 4</h1>
          <p>This is Step 4.</p>
        </div>
      </Steps>
      <Button onClick={prev}>Back</Button>
      <Button onClick={next}>Next</Button>
      <div>Total: {total}</div>
      <div>Current: {current}</div>
      <div>Progress: {progress * 100}%</div>
    </>
  )
}
