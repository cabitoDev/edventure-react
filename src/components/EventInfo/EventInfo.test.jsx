import { test, vi } from 'vitest'
import { render } from '@testing-library/react'
import EventInfo from './EventInfo'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

const googleMapsMock = {
  maps: {
    places: {
      PlacesService: vi.fn(() => ({
        getDetails: vi.fn()
      }))
    },
    Map: vi.fn(() => ({
      setZoom: vi.fn(),
      fitBounds: vi.fn()
    }))
  }
}

window.google = googleMapsMock

test('EventInfo renders correctly', () => {
  const event = {
    id: 1,
    name: 'Sample Event',
    image: 'sample-image.jpg',
    type: 'Type',
    description: 'Sample Description',
    assistants: 10,
    date: '2024-05-31',
    address: '123 Sample St',
    placeId: 'sample-place-id',
    followers: 5,
    followersHistory: [],
    usersFollowing: [],
    userOwner: {
      id: 1,
      nickname: 'Owner',
      avatar: 'owner-avatar.jpg',
      email: 'owner@example.com',
      showEmail: true
    }
  }
  const setIsEditing = vi.fn()
  const user = { id: 2, followingEvents: [] }
  const mockedStore = {
    getState: vi.fn().mockReturnValue({}),
    dispatch: vi.fn(),
    subscribe: vi.fn(),
    replaceReducer: vi.fn()
  }

  render(
    <Provider store={mockedStore}>
      <BrowserRouter>
        <EventInfo event={event} setIsEditing={setIsEditing} user={user} />
      </BrowserRouter>
    </Provider>
  )
})
