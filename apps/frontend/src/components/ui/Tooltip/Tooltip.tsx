'use client'

import { type FC, type ReactElement, type ReactNode, useState } from 'react'

import { TooltipBubble, TooltipWrapper } from './Tooltip.styles'

type Props = {
  title: ReactNode
  children: ReactElement
  placement?: 'top' | 'bottom'
}

export const Tooltip: FC<Props> = ({ title, children, placement = 'top' }) => {
  const [open, setOpen] = useState(false)

  const show = (): void => setOpen(true)
  const hide = (): void => setOpen(false)

  return (
    <TooltipWrapper onMouseEnter={show} onMouseLeave={hide} onFocus={show} onBlur={hide}>
      {children}
      {open && title && (
        <TooltipBubble role="tooltip" $placement={placement}>
          {title}
        </TooltipBubble>
      )}
    </TooltipWrapper>
  )
}
