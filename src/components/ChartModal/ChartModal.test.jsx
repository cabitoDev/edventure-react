import { test, expect } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'

import React from 'react'
import ChartModal from './ChartModal'

test('ChartModal renders correctly when data is available', () => {
  const followersHistory = { '2024-04-02': 4, '2024-05-02': 1 }
  const isOpen = true
  const onClose = () => {}

  render(
    <ChartModal
      followersHistory={followersHistory}
      isOpen={isOpen}
      onClose={onClose}
    />
  )

  const modal = screen.getByTestId('chart-modal')
  expect(modal).toBeDefined()

  const victoryChart = screen.getByTestId('victory-chart')
  expect(victoryChart).toBeDefined()
})

test('ChartModal renders correctly when data is not available', () => {
  cleanup()
  const followersHistory = { '2024-04-02': 4 }
  const isOpen = true
  const onClose = () => {}

  render(
    <ChartModal
      followersHistory={followersHistory}
      isOpen={isOpen}
      onClose={onClose}
    />
  )

  const modal = screen.getByTestId('chart-modal')
  expect(modal).toBeDefined()

  const noStatsMessage = screen.getByText('NO_STATS_YET')
  expect(noStatsMessage).toBeDefined()
})
