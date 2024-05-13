import { test, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import EditEvent from './EditEvent'
import React from 'react'
import { Provider } from 'react-redux'

test('EditEvent renders correctly', () => {
  const event = {
    date: '2024-05-31',
    image: 'sample-image.jpg'
  }
  const setEvent = vi.fn()
  const setIsEditing = vi.fn()
  const mockedStore = {
    getState: vi.fn().mockReturnValue({}),
    dispatch: vi.fn(),
    subscribe: vi.fn(),
    replaceReducer: vi.fn()
  }

  render(
    <Provider store={mockedStore}>
      <EditEvent
        event={event}
        setEvent={setEvent}
        setIsEditing={setIsEditing}
      />
    </Provider>
  )

  screen.getByLabelText('NAME')
  screen.getByLabelText('DATE')
  screen.getAllByLabelText('EVENT_TYPE')
  screen.getAllByLabelText('NUMBER_ASSISTANTS')
  screen.getByLabelText('ADDRESS_LABEL')
  screen.getByLabelText('DESCRIPTION')
  screen.getByText('SAVE')
})
