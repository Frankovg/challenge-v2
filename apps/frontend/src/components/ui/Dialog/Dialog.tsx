'use client'

import { type FC, type ReactNode, useEffect } from 'react'
import { createPortal } from 'react-dom'

import { DialogContent, Overlay } from './Dialog.styles'

type Props = {
  open: boolean
  onClose: () => void
  children: ReactNode
  ariaLabelledBy?: string
  ariaDescribedBy?: string
}

export const Dialog: FC<Props> = ({
  open,
  onClose,
  children,
  ariaLabelledBy,
  ariaDescribedBy,
}) => {
  useEffect(() => {
    if (!open) return

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [open, onClose])

  if (!open) return null

  return createPortal(
    <Overlay
      data-testid="dialog-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <DialogContent
        role="dialog"
        aria-modal="true"
        aria-labelledby={ariaLabelledBy}
        aria-describedby={ariaDescribedBy}
        tabIndex={-1}
      >
        {children}
      </DialogContent>
    </Overlay>,
    document.body,
  )
}
