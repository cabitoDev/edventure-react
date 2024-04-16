import {
  StepName,
  StepImage,
  StepType,
  StepAssistants,
  StepWhen,
  StepWhere,
  StepDescription
} from '.'
import Constants from '../../constants'
export const steps = [
  {
    title: Constants.QUESTION_STEP_NAME,
    component: <StepName />
  },
  {
    title: Constants.QUESTION_STEP_TYPE,
    component: <StepType />
  },
  {
    title: Constants.QUESTION_STEP_IMAGE,
    component: <StepImage />
  },
  {
    title: Constants.QUESTION_STEP_WHEN,
    component: <StepWhen />
  },
  {
    title: Constants.QUESTION_STEP_WHERE,
    component: <StepWhere />
  },
  {
    title: Constants.QUESTION_STEP_ASSISTANTS,
    component: <StepAssistants />
  },
  {
    title: Constants.QUESTION_STEP_DESCRIPTION,
    component: <StepDescription />
  }
]
