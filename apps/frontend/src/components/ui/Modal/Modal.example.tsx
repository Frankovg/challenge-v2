'use client'

import { useState, type ReactNode } from 'react'

import { Modal } from './Modal'

/**
 * Example usage of the Modal component
 */
export const ModalExample = (): ReactNode => {
  const [open, setOpen] = useState(false)

  const handleOpen = (): void => setOpen(true)
  const handleClose = (): void => setOpen(false)

  return (
    <div>
      <button onClick={handleOpen}>Open Modal</button>

      <Modal
        open={open}
        onClose={handleClose}
        ariaLabelledBy="modal-title"
        ariaDescribedBy="modal-description"
      >
        <div style={{ padding: '20px' }}>
          <h2 id="modal-title">Modal Title</h2>
          <p id="modal-description">
            This is a generic modal component that accepts any children. It uses
            Material UI&apos;s Modal component with custom styling to match the
            application&apos;s design system.
          </p>
          <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
            <button onClick={handleClose}>Close</button>
            <button onClick={handleClose}>Confirm</button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
