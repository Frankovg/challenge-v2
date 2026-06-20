'use client'

import { useTheme } from 'next-themes'
import { FC, useEffect, useState } from 'react'

import { IconButton } from 'components/ui/IconButton'
import { MoonIcon, SunIcon } from 'components/ui/icons'
import { Tooltip } from 'components/ui/Tooltip'

export const DARK = 'dark'
export const LIGHT = 'light'
export const MOON_ICON = 'Moon icon'
export const SUN_ICON = 'Sun icon'

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
    <Tooltip title={`Switch to ${newTheme} mode`}>
      <IconButton
        onClick={toggleTheme}
        aria-label={`Switch to ${newTheme} mode`}
      >
        {!isDark ? (
          <MoonIcon aria-label={MOON_ICON} />
        ) : (
          <SunIcon aria-label={SUN_ICON} />
        )}
      </IconButton>
    </Tooltip>
  )
}
