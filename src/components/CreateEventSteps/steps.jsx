import {
  FormName,
  FormImage,
  FormType,
  FormAssistants,
  FormDate,
  FormAddress,
  FormDescription
} from '.'
import Constants from '../../constants'
export const steps = [
  {
    title: Constants.QUESTION_STEP_NAME,
    component: <FormName />
  },
  {
    title: Constants.QUESTION_STEP_TYPE,
    component: <FormType />
  },
  {
    title: Constants.QUESTION_STEP_IMAGE,
    component: <FormImage />
  },
  {
    title: Constants.QUESTION_STEP_DATE,
    component: <FormDate />
  },
  {
    title: Constants.QUESTION_STEP_ADDRESS,
    component: <FormAddress className='input-width' />
  },
  {
    title: Constants.QUESTION_STEP_ASSISTANTS,
    component: <FormAssistants />
  },
  {
    title: Constants.QUESTION_STEP_DESCRIPTION,
    component: <FormDescription />
  }
]
