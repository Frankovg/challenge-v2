'use client'

import { type FC, type ReactNode, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { styled } from 'styled-components'

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: var(--z-modal-backdrop);
  -webkit-tap-highlight-color: transparent;
`

const DialogContent = styled.div`
  background-color: var(--bg-primary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  box-shadow: var(--shadow-md);
  max-width: 90vw;
  max-height: 90vh;
  overflow: auto;
  z-index: var(--z-modal);
  transition:
    background-color var(--transition-base),
    border-color var(--transition-base);
`

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
