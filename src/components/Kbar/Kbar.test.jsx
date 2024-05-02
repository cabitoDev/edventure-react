import { test } from 'vitest'
import React from 'react'
import { render, screen } from '@testing-library/react'
import KProvider from './KProvider'
import KInput from './KInput'

test('KProvider renders correctly', () => {
  render(
    <KProvider actions={[]}>
      <KInput />
    </KProvider>
  )
  screen.getByRole('textbox')
})
