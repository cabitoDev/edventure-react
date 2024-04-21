import {
  FormName,
  FormImage,
  FormType,
  FormAssistants,
  FormDate,
  FormAddress,
  FormDescription
} from '.'
import React from 'react'
const steps = [
  {
    title: 'QUESTION_NAME',
    component: <FormName />
  },
  {
    title: 'QUESTION_TYPE',
    component: <FormType />
  },
  {
    title: 'QUESTION_IMAGE',
    component: <FormImage />
  },
  {
    title: 'QUESTION_DATE',
    component: <FormDate />
  },
  {
    title: 'QUESTION_ADDRESS',
    component: <FormAddress />
  },
  {
    title: 'QUESTION_ASSISTANTS',
    component: <FormAssistants />
  },
  {
    title: 'QUESTION_DESCRIPTION',
    component: <FormDescription />
  }
]
export default steps
