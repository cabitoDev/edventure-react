import { test, expect } from 'vitest'
import { render } from '@testing-library/react'
import ProgressBar from './ProgressBar'
import React from 'react'

test('ProgressBar renders with correct progress and styles', () => {
  const progress = 0.5
  const { container } = render(<ProgressBar progress={progress} />)
  const progressBar = container.querySelector('[data-testid="progress-bar"]')
  expect(progressBar.classList.contains('bg-primary')).toBeTruthy()
  expect(progressBar.style.width).toBe(`${progress * 100}%`)
})
test('ProgressBar renders with correct progress and styles', () => {
  const progress = 1
  const { container } = render(<ProgressBar progress={progress} />)
  const progressBar = container.querySelector('[data-testid="progress-bar"]')
  expect(progressBar.classList.contains('bg-green-500')).toBeTruthy()
  expect(progressBar.style.width).toBe(`${progress * 100}%`)
})
