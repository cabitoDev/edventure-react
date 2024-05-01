import { test, expect } from 'vitest'
import { render } from '@testing-library/react'
import Countdown from './Countdown'
import React from 'react'

test('Countdown renders with correct props', () => {
  const date = new Date()
  date.setSeconds(date.getSeconds() + 10)

  const { getByText } = render(<Countdown date={date.toISOString()} />)

  expect(getByText('DAYS')).toBeTruthy()
  expect(getByText('HOUR')).toBeTruthy()
  expect(getByText('MIN')).toBeTruthy()
  expect(getByText('SEC')).toBeTruthy()
})

test('Countdown stops when reaching zero', done => {
  const date = new Date()
  date.setSeconds(date.getSeconds() + 2)

  const { getByText } = render(<Countdown date={date.toISOString()} />)

  setTimeout(() => {
    expect(getByText('00')).toBeTruthy()
    done()
  }, 3000)
})
