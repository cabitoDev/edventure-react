import { test, expect, vi } from 'vitest'
import React from 'react'
import { render, screen } from '@testing-library/react'
import DeleteModal from './DeleteModal'
import { Provider } from 'react-redux'

test('DeleteModal renders correctly', () => {
  const setIsOpenMock = vi.fn()
  const onDeleteMock = vi.fn()
  const mockedStore = {
    getState: vi.fn().mockReturnValue({}),
    dispatch: vi.fn(),
    subscribe: vi.fn(),
    replaceReducer: vi.fn()
  }
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

  screen.getByText('Are you sure you want to delete?')
  const cancelButton = screen.getByText('CANCEL')
  const deleteButton = screen.getByText('DELETE')
  cancelButton.click()
  expect(setIsOpenMock).toHaveBeenCalledWith(false)
  deleteButton.click()
  expect(onDeleteMock).toHaveBeenCalled()
})
