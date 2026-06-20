'use client'

import { type ReactNode } from 'react'
import { createPortal } from 'react-dom'

import {
  StyledToastClose,
  StyledToastContent,
  StyledToastDescription,
  StyledToastRoot,
  StyledToastTitle,
  StyledToastViewport,
} from './Toast.styles'
import { useToast } from './ToastContext'

export const Toast = (): ReactNode => {
  const { toasts, remove } = useToast()

  if (typeof document === 'undefined' || toasts.length === 0) return null

  return createPortal(
    <StyledToastViewport>
      {toasts.map((toast) => (
        <StyledToastRoot
          key={toast.id}
          role="status"
          data-type={toast.type ?? 'info'}
        >
          <StyledToastContent>
            {toast.title && <StyledToastTitle>{toast.title}</StyledToastTitle>}
            {toast.description && (
              <StyledToastDescription>
                {toast.description}
              </StyledToastDescription>
            )}
          </StyledToastContent>
          <StyledToastClose
            type="button"
            aria-label="Close notification"
            onClick={() => remove(toast.id)}
          />
        </StyledToastRoot>
      ))}
    </StyledToastViewport>,
    document.body,
  )
}
