import React from 'react'
import { FormProvider } from 'react-hook-form'
import { render, screen } from '@testing-library/react'
import { test, vi } from 'vitest'
import FormName from './FormName'
import FormType from './FormType'
import FormAddress from './FormAddress'
import FormAssistants from './FormAssistants'
import FormDate from './FormDate'
import FormDescription from './FormDescription'
import FormImage from './FormImage'

const useFormContextMock = {
  register: vi.fn(),
  clearErrors: vi.fn(),
  watch: vi.fn(() => 'mockedValue'),
  formState: { errors: { name: 'ERROR_NAME' } }
}

test('Form steps renders correctly', () => {
  render(
    <FormProvider {...useFormContextMock}>
      <FormName />
      <FormType />
      <FormAddress />
      <FormAssistants />
      <FormDate />
      <FormImage />
      <FormDescription />
    </FormProvider>
  )

  screen.getByLabelText('NAME')
  screen.getAllByLabelText('EVENT_TYPE')
  screen.getByLabelText('ADDRESS_LABEL')
  screen.getAllByLabelText('NUMBER_ASSISTANTS')
  screen.getByLabelText('DATE')
  screen.getByTestId('EVENT_IMAGE')
  screen.getByLabelText('DESCRIPTION')
  screen.getByText('ERROR_NAME')
})
