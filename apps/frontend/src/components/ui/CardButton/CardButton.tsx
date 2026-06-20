import { ButtonHTMLAttributes, ReactNode } from 'react'

import { CardButtonContainer } from './CardButton.styles'

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
}

export const CardButton = ({
  children,
  ...props
}: IconButtonProps): ReactNode => {
  return <CardButtonContainer {...props}>{children}</CardButtonContainer>
}
