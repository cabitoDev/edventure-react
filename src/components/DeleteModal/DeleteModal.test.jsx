import { test, expect, vi } from 'vitest'
import React from 'react'
import { render, screen } from '@testing-library/react'
import DeleteModal from './DeleteModal'

test('DeleteModal renders correctly', () => {
  const setIsOpenMock = vi.fn()
  const onDeleteMock = vi.fn()

  render(
    <DeleteModal
      isOpen={true}
      setIsOpen={setIsOpenMock}
      onDelete={onDeleteMock}
      text='Are you sure you want to delete?'
    />
  )

  screen.getByText('Are you sure you want to delete?')
  const cancelButton = screen.getByText('CANCEL')
  const deleteButton = screen.getByText('CONFIRM_DELETE')
  cancelButton.click()
  expect(setIsOpenMock).toHaveBeenCalledWith(false)
  deleteButton.click()
  expect(onDeleteMock).toHaveBeenCalled()
})
