'use client'

import { Modal as MuiModal } from '@mui/material'
import { type FC, type ReactNode } from 'react'

import { ModalBackdrop, ModalContent } from './Modal.styles'

type ModalProps = {
  open: boolean
  onClose: () => void
  children: ReactNode
  ariaLabelledBy?: string
  ariaDescribedBy?: string
  keepMounted?: boolean
}

export const Modal: FC<ModalProps> = ({
  open,
  onClose,
  children,
  ariaLabelledBy,
  ariaDescribedBy,
  keepMounted = false,
}) => {
  return (
    <MuiModal
      open={open}
      onClose={onClose}
      aria-labelledby={ariaLabelledBy}
      aria-describedby={ariaDescribedBy}
      keepMounted={keepMounted}
      slots={{
        backdrop: ModalBackdrop,
      }}
      sx={{
        zIndex: 'var(--z-modal)',
      }}
    >
      <ModalContent tabIndex={-1}>{children}</ModalContent>
    </MuiModal>
  )
}
