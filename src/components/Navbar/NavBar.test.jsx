import { expect, test, vi } from 'vitest'
import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import NavBar from './NavBar'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { userOptions } from './navBarOptions'

test('NavBar renders correctly when user is not logged', () => {
  const store = {
    getState: () => ({}),
    dispatch: () => {},
    subscribe: () => {},
    replaceReducer: () => {}
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
  screen.getByText('SIGN_UP')
})

test('NavBarMenu should work', () => {
  const setIsMenuOpen = vi.fn()

  userOptions.forEach(option => {
    const link = screen.getByText(option.label)
    fireEvent.click(link)
    setTimeout(() => {
      expect(setIsMenuOpen).toHaveBeenCalledWith(false)
    }, 1000)
  })
})
