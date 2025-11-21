import { ButtonHTMLAttributes, FC, ReactNode } from 'react'

import { ScrollAreaContainer } from './ScrollArea.styles'


interface ScrollAreaProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
}

export const ScrollArea: FC<ScrollAreaProps> = ({ children }): ReactNode => {
  return (
    <ScrollAreaContainer>
      {children}
    </ScrollAreaContainer>
  )
}
