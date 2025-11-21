import { ButtonHTMLAttributes, ReactNode } from 'react'

import { ScreenReaderOnly } from 'components/ScreenReaderOnly'

import { CardButtonContainer } from './CardButton.styles'

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
}

export const CardButton = ({ children, ...props }: IconButtonProps): ReactNode => {
  return (
    <CardButtonContainer {...props}>
      {children}
      <ScreenReaderOnly text={props['aria-label'] ?? ''} />
    </CardButtonContainer>
  )
}
