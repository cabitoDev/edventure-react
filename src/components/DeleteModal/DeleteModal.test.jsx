import { test, expect, vi, beforeEach } from 'vitest'
import React from 'react'
import { render, screen, cleanup } from '@testing-library/react'
import DeleteModal from './DeleteModal'
import { Provider } from 'react-redux'

const setIsOpenMock = vi.fn()
const onDeleteMock = vi.fn()
const mockedStore = {
  getState: vi.fn().mockReturnValue({}),
  dispatch: vi.fn(),
  subscribe: vi.fn(),
  replaceReducer: vi.fn()
}
beforeEach(() => {
  cleanup()
  render(
    <Provider store={mockedStore}>
      <DeleteModal
        isOpen={true}
        setIsOpen={setIsOpenMock}
        onDelete={onDeleteMock}
        text='Are you sure you want to delete?'
      />
    </Provider>
  )
})
test('DeleteModal is closed on cancel', () => {
  screen.getByText('Are you sure you want to delete?')
  const cancelButton = screen.getByTestId('CANCEL')
  cancelButton.click()
  expect(setIsOpenMock).toHaveBeenCalledWith(false)
})
test('DeleteModal calls delete function on delete', () => {
  const deleteButton = screen.getByTestId('CONFIRM_DELETE')
  deleteButton.click()
  expect(onDeleteMock).toHaveBeenCalled()
})
