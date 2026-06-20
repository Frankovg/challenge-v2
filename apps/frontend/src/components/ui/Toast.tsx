'use client'

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { createPortal } from 'react-dom'
import { styled } from 'styled-components'

export type ToastType = 'success' | 'error' | 'warning' | 'info'

export type ToastItem = {
  id: number
  title?: string
  description?: string
  type?: ToastType
}

type ToastInput = Omit<ToastItem, 'id'>

type ToastContextValue = {
  toasts: ToastItem[]
  add: (toast: ToastInput) => void
  remove: (id: number) => void
}

const AUTO_DISMISS_MS = 5000

const ToastContext = createContext<ToastContextValue | undefined>(undefined)

export const ToastProvider = ({
  children,
}: {
  children: ReactNode
}): ReactNode => {
  const [toasts, setToasts] = useState<ToastItem[]>([])
  const idRef = useRef(0)

  const remove = useCallback((id: number): void => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  const add = useCallback(
    (toast: ToastInput): void => {
      const id = (idRef.current += 1)
      setToasts((prev) => [...prev, { ...toast, id }])
      setTimeout(() => remove(id), AUTO_DISMISS_MS)
    },
    [remove],
  )

  const value = useMemo(() => ({ toasts, add, remove }), [toasts, add, remove])

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
}

export const useToast = (): ToastContextValue => {
  const context = useContext(ToastContext)
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}

const StyledToastViewport = styled.ol`
  position: fixed;
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  width: fit-content;
  max-width: 100vw;
  margin: 0;
  padding: var(--spacing-lg);
  list-style: none;
  z-index: var(--z-popover);
  pointer-events: none;

  & > * {
    pointer-events: auto;
  }
`

const StyledToastRoot = styled.li`
  position: relative;
  min-width: 16rem;
  background-color: var(--bg-primary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
  padding: var(--spacing-md);
  padding-right: var(--spacing-xl);
  animation: toast-slide-in 150ms cubic-bezier(0.16, 1, 0.3, 1);

  &[data-type='success'] {
    background-color: var(--status-success-bg);
    border-color: var(--status-success-border);
  }

  &[data-type='error'] {
    background-color: var(--status-error-bg);
    border-color: var(--status-error-border);
  }

  &[data-type='warning'] {
    background-color: var(--status-warning-bg);
    border-color: var(--status-warning-border);
  }

  &[data-type='info'] {
    background-color: var(--status-info-bg);
    border-color: var(--status-info-border);
  }

  @keyframes toast-slide-in {
    from {
      transform: translateX(calc(100% + var(--spacing-lg)));
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`

const StyledToastContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
`

const StyledToastTitle = styled.p`
  margin: 0;
  color: var(--text-primary);
  font-weight: var(--font-weight-medium);
  font-size: var(--font-size-sm);
  line-height: var(--line-height-tight);
`

const StyledToastDescription = styled.p`
  margin: 0;
  color: var(--text-secondary);
  font-size: var(--font-size-xs);
  line-height: var(--line-height-normal);
`

const StyledToastClose = styled.button`
  position: absolute;
  top: var(--spacing-sm);
  right: var(--spacing-sm);
  height: 1.25rem;
  width: 1.25rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: var(--radius-sm);
  color: var(--text-secondary);
  background-color: transparent;
  cursor: pointer;
  transition: all var(--transition-fast);

  &:hover {
    background-color: var(--bg-hover);
    color: var(--text-primary);
  }

  &::after {
    content: '×';
    font-size: 20px;
    line-height: 1;
  }
`

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
