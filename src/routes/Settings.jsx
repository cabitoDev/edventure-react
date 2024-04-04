'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Button } from '@nextui-org/react'

export function Settings () {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <>
      The current theme is: {theme}
      <Button onClick={() => setTheme('light')}>Light Mode</Button>
      <Button onClick={() => setTheme('dark')}>Dark Mode</Button>
    </>
  )
}
