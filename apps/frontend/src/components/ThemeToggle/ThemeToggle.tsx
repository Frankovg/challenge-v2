'use client'

import { MoonIcon, SunIcon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { FC, useEffect, useState } from 'react'

import { DARK, LIGHT, MOON_ICON, SUN_ICON } from './const'
import { ToggleButton } from './ThemeToggle.styles'

export const ThemeToggle: FC = () => {
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const isDark = resolvedTheme === DARK
  const newTheme = isDark ? LIGHT : DARK

  const toggleTheme = (): void => {
    setTheme(newTheme)
  }

  return (
    <ToggleButton
      onClick={toggleTheme}
      aria-label={`Switch to ${newTheme} mode`}
      title={`Switch to ${newTheme} mode`}
    >
      {!isDark ? (
        <MoonIcon aria-label={MOON_ICON} />
      ) : (
        <SunIcon aria-label={SUN_ICON} />
      )}
    </ToggleButton>
  )
}
