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

export const ToastProvider = ({ children }: { children: ReactNode }): ReactNode => {
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
    [remove]
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
