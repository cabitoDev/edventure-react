import { expect, test, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import EventCard from './EventCard'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'

const event = {
  id: 1,
  name: 'Sample Event',
  image: 'sample-image.jpg',
  type: 'Type',
  description: 'Sample Description',
  userOwner: { id: 1 },
  usersFollowing: [1, 2, 3]
}
const userId = 1
const useHistoryMock = {
  push: vi.fn()
}
React.useHistory = () => useHistoryMock

test('EventCard renders correctly', () => {
  render(
    <BrowserRouter>
      <EventCard event={event} userId={userId} />
    </BrowserRouter>
  )

  screen.getByText('Sample Event')
  screen.getByText('Type')
  screen.getByText('Sample Description')
  screen.getByText('OWNER')
  screen.getByText('Followers: 3')
})

test('should navigate to event url on link click', () => {
  const link = screen.getByText('Sample Event')
  link.click()
  setTimeout(() => {
    expect(useHistoryMock.push).toHaveBeenCalledWith(`/event/${event.id}`)
  }, 1000)
})
