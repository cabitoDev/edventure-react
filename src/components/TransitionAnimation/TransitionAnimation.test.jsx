import { test, expect } from 'vitest'
import { render } from '@testing-library/react'
import TransitionAnimation from './TransitionAnimation'
import React from 'react'

test('TransitionAnimation renders with correct props', () => {
  const className = 'test-class'

  const { getByText } = render(
    <TransitionAnimation className={className}>
      <div>Test Content</div>
    </TransitionAnimation>
  )

  expect(getByText('Test Content')).toBeTruthy()

  const transitionDiv = getByText('Test Content').parentNode
  expect(transitionDiv.classList.contains(className)).toBeTruthy()
})
