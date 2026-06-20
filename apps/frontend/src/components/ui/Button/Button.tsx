import { type ButtonHTMLAttributes, type ReactNode } from 'react'

import { StyledButton } from './Button.styles'

export type ButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'color'
> & {
  variant?: 'primary' | 'secondary' | 'outlined' | 'text'
  color?: 'default' | 'success' | 'warning' | 'error'
  loading?: boolean
  loadingIndicator?: ReactNode
  loadingPosition?: 'start' | 'end'
  children: ReactNode
}

export const Button = ({
  variant = 'primary',
  color = 'default',
  loading = false,
  loadingIndicator,
  loadingPosition = 'start',
  disabled,
  children,
  ...props
}: ButtonProps): ReactNode => {
  return (
    <StyledButton
      type="button"
      $variant={variant}
      $color={color}
      disabled={disabled || loading}
      {...props}
    >
      {loading && loadingPosition === 'start' && loadingIndicator}
      {children}
      {loading && loadingPosition === 'end' && loadingIndicator}
    </StyledButton>
  )
}
