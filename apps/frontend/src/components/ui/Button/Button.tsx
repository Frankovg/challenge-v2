'use client'

import { ButtonProps as MuiButtonProps } from '@mui/material/Button'
import { ReactNode } from 'react'

import { StyledButton } from './Button.styles'

export interface ButtonProps extends Omit<MuiButtonProps, 'variant'> {
  variant?: 'primary' | 'secondary' | 'outlined' | 'text'
  children: ReactNode
}

export const Button = ({
  variant = 'primary',
  children,
  ...props
}: ButtonProps): ReactNode => {
  const getMuiVariant = (): MuiButtonProps['variant'] => {
    if (variant === 'primary') return 'contained'
    if (variant === 'secondary') return 'contained'
    if (variant === 'outlined') return 'outlined'
    return 'text'
  }

  return (
    <StyledButton
      variant={getMuiVariant()}
      $customVariant={variant}
      disableElevation
      {...props}
    >
      {children}
    </StyledButton>
  )
}
