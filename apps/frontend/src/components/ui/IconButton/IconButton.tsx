import { ButtonHTMLAttributes, ReactNode } from 'react'

import { ScreenReaderOnly } from 'components/ScreenReaderOnly'

import { IconButtonContainer } from './IconButton.styles'

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
}

export const IconButton = ({ children, ...props }: IconButtonProps): ReactNode => {
  return (
    <IconButtonContainer {...props}>
      {children}
      <ScreenReaderOnly text={props['aria-label'] ?? ''} />
    </IconButtonContainer>
  )
}
