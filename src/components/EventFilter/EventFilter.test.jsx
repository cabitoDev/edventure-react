import { test, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import EventFilter from './EventFilter'
import React from 'react'

const handleSearchChange = vi.fn()
const handleFilterChange = vi.fn()
const handleFilterOtherChange = vi.fn()

test('EventFilter renders correctly', () => {
  render(
    <EventFilter
      handleSearchChange={handleSearchChange}
      handleFilterChange={handleFilterChange}
      handleFilterOtherChange={handleFilterOtherChange}
      ownerOption={true}
    />
  )
  screen.getByPlaceholderText('SEARCH_NAME')
  screen.getByLabelText('type-select')
  screen.getByLabelText('ALL')
  screen.getByLabelText('FOLLOWING')
  screen.getByLabelText('OWNER')
})

test('EventFilter renders correctly without owner option', () => {
  render(
    <EventFilter
      handleSearchChange={handleSearchChange}
      handleFilterChange={handleFilterChange}
      handleFilterOtherChange={handleFilterOtherChange}
      ownerOption={false}
    />
  )
  screen.getByLabelText('NOT_FOLLOWING')
})
