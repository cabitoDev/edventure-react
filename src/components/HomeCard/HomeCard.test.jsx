import { test, expect } from 'vitest'
import { render } from '@testing-library/react'
import HomeCard from './HomeCard'
import React from 'react'

test('HomeCard renders with correct props', () => {
  const headerTitle = 'Header Title'
  const headerSubtitle = 'Header Subtitle'
  const description = 'Description'
  const image = 'example.jpg'

  const { getByText, getByAltText } = render(
    <HomeCard
      headerTitle={headerTitle}
      headerSubtitle={headerSubtitle}
      description={description}
      image={image}
    />
  )
  expect(getByText(headerTitle)).toBeTruthy()
  expect(getByText(headerSubtitle)).toBeTruthy()
  expect(getByText(description)).toBeTruthy()
  expect(getByAltText('Decorative image of home landing')).toBeTruthy()
})
