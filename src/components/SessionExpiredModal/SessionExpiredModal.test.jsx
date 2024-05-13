import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import SessionExpiredModal from './SessionExpiredModal'
import { expect, test, vi } from 'vitest'
import { BrowserRouter } from 'react-router-dom'

test('should render correctly', () => {
  const mockedStore = {
    getState: vi.fn().mockReturnValue({}),
    dispatch: vi.fn(),
    subscribe: vi.fn(),
    replaceReducer: vi.fn()
  }
  render(
    <Provider store={mockedStore}>
      <BrowserRouter>
        <SessionExpiredModal />
      </BrowserRouter>
    </Provider>
  )
  const acceptButton = screen.getByText('ACCEPT')
  acceptButton.click()
  vi.waitFor(() => {
    const acceptButtonAfterClick = screen.queryByText('ACCEPT')
    expect(acceptButtonAfterClick).toBeNull()
  })
})
