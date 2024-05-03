import { expect, test, vi } from 'vitest'
import React from 'react'
import { render, screen, cleanup } from '@testing-library/react'
import NavBar from './NavBar'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

vi.mock('kbar', () => ({
  useKBar: vi.fn(() => ({
    query: {
      toggle: vi.fn()
    }
  }))
}))

test('NavBar renders correctly when user is not logged', () => {
  const store = {
    getState: vi.fn().mockReturnValue({}),
    dispatch: vi.fn(),
    subscribe: vi.fn(),
    replaceReducer: vi.fn()
  }

  render(
    <Provider store={store}>
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>
    </Provider>
  )
  screen.getByTestId('LOGO')
  screen.getByText('EXPLORE_EVENTS')
  screen.getByText('CREATE_EVENT')
  screen.getByText('SIGN_UP').click()
  expect()
})

const useHistoryMock = {
  push: vi.fn()
}
React.useHistory = () => useHistoryMock

test('NavBar renders correctly when user is logged', () => {
  cleanup()
  const store = {
    getState: vi.fn().mockReturnValue({
      user: {
        id: 12478
      }
    }),
    dispatch: vi.fn(),
    subscribe: vi.fn(),
    replaceReducer: vi.fn()
  }

  render(
    <Provider store={store}>
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>
    </Provider>
  )
  screen.getByTestId('LOGO')
  screen.getByText('EXPLORE_EVENTS')
  screen.getByText('CREATE_EVENT')
  screen.getByTestId('NAVBAR_AVATAR').click()
})
