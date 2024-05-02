import { test, vi } from 'vitest'
import { render } from '@testing-library/react'
import GoogleMap from './GoogleMap'
import React from 'react'

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

test('GoogleMap renders correctly with placeId', () => {
  render(<GoogleMap placeId='sample-place-id' />)
  document.getElementById('map')
})
