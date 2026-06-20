import { ButtonHTMLAttributes, FC, ReactNode } from 'react'

import { ScrollAreaContainer } from './ScrollArea.styles'

interface ScrollAreaProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  direction?: 'horizontal' | 'vertical'
}

export const ScrollArea: FC<ScrollAreaProps> = ({
  children,
  direction = 'vertical',
}): ReactNode => {
  return (
    <ScrollAreaContainer $direction={direction}>{children}</ScrollAreaContainer>
  )
}
