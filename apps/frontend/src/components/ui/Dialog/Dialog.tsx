'use client'

import Modal from '@mui/material/Modal'
import { type FC, type ReactNode } from 'react'

import { ModalBackdrop, DialogContent } from './Dialog.styles'

type ModalProps = {
  open: boolean
  onClose: () => void
  children: ReactNode
  ariaLabelledBy?: string
  ariaDescribedBy?: string
  keepMounted?: boolean
}

export const Dialog: FC<ModalProps> = ({
  open,
  onClose,
  children,
  ariaLabelledBy,
  ariaDescribedBy,
  keepMounted = false,
}) => {
  return (
    <Modal
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
      <DialogContent tabIndex={-1}>{children}</DialogContent>
    </Modal>
  )
}
