import { expect, test } from 'vitest'
import { render } from '@testing-library/react'
import Kbd from './Kbd'
import React from 'react'

test('Kbd renders correctly with children and className', () => {
  const { getByText } = render(<Kbd className='custom-class'>Ctrl</Kbd>)

  const kbdElement = getByText('Ctrl')

  const className = kbdElement.getAttribute('class')
  expect(className).toMatch(/\brounded-md\b/)
  expect(className).toMatch(/\bborder-b-2\b/)
  expect(className).toMatch(/\bpx-2\b/)
  expect(className).toMatch(/\bpy-0\.5\b/)
  expect(className).toMatch(/\btext-sm\b/)
  expect(className).toMatch(/\bcustom-class\b/)
})
