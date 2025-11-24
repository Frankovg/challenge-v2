import { ButtonHTMLAttributes, ReactNode } from 'react'

import { IconButtonContainer } from './IconButton.styles'

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
}

export const IconButton = ({ children, ...props }: IconButtonProps): ReactNode => {
  return (
    <IconButtonContainer {...props}>
      {children}
    </IconButtonContainer>
  )
}
