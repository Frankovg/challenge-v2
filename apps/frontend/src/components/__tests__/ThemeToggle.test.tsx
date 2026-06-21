import { render, screen } from '@testing-library/react'
import { default as userEvent } from '@testing-library/user-event'
import React from 'react'

import { DARK, LIGHT, MOON_ICON, SUN_ICON, ThemeToggle } from '../ThemeToggle'

const mockSetTheme = jest.fn()
const mockUseTheme = jest.fn()

jest.mock('next-themes', () => ({
  useTheme: () => mockUseTheme(),
}))

describe('ThemeToggle component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    localStorage.clear()
  })

  describe('theme switching', () => {
    it('should switch from light to dark theme when clicked', async () => {
      mockUseTheme.mockReturnValue({
        resolvedTheme: LIGHT,
        setTheme: mockSetTheme,
      })

      render(<ThemeToggle />)

      const button = screen.getByRole('button', {
        name: /switch to dark mode/i,
      })
      const moonIcon = screen.getByLabelText(MOON_ICON)

      expect(moonIcon).toBeInTheDocument()

      await userEvent.click(button)

      expect(mockSetTheme).toHaveBeenCalledWith(DARK)
    })

    it('should switch from dark to light theme when clicked', async () => {
      mockUseTheme.mockReturnValue({
        resolvedTheme: DARK,
        setTheme: mockSetTheme,
      })

      render(<ThemeToggle />)

      const button = screen.getByRole('button', {
        name: /switch to light mode/i,
      })
      const sunIcon = screen.getByLabelText(SUN_ICON)

      expect(sunIcon).toBeInTheDocument()

      await userEvent.click(button)

      expect(mockSetTheme).toHaveBeenCalledWith(LIGHT)
    })

    it('should handle multiple rapid theme toggles', async () => {
      mockUseTheme.mockReturnValue({
        resolvedTheme: LIGHT,
        setTheme: mockSetTheme,
      })

      render(<ThemeToggle />)

      const button = screen.getByRole('button')

      await userEvent.click(button)
      await userEvent.click(button)
      await userEvent.click(button)

      expect(mockSetTheme).toHaveBeenCalledTimes(3)
      expect(mockSetTheme).toHaveBeenCalledWith(DARK)
    })
  })

  describe('icon display', () => {
    it('should display correct icon based on current theme', () => {
      mockUseTheme.mockReturnValue({
        resolvedTheme: LIGHT,
        setTheme: mockSetTheme,
      })

      const { unmount } = render(<ThemeToggle />)

      expect(screen.getByLabelText(MOON_ICON)).toBeInTheDocument()
      expect(screen.queryByLabelText(SUN_ICON)).not.toBeInTheDocument()

      unmount()

      mockUseTheme.mockReturnValue({
        resolvedTheme: DARK,
        setTheme: mockSetTheme,
      })

      render(<ThemeToggle />)

      expect(screen.getByLabelText(SUN_ICON)).toBeInTheDocument()
      expect(screen.queryByLabelText(MOON_ICON)).not.toBeInTheDocument()
    })
  })
})
