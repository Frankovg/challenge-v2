'use client'

import { Toast as MuiToast } from "@base-ui-components/react/toast";

import {
  StyledToastViewport,
  StyledToastRoot,
  StyledToastContent,
  StyledToastTitle,
  StyledToastDescription,
  StyledToastClose
} from './Toast.styles'

export const Toast = () => {
  const { toasts } = MuiToast.useToastManager();

  return (
    <MuiToast.Portal>
      <StyledToastViewport>
        {toasts.map((t) => (
          <StyledToastRoot key={t.id} toast={t} data-type={t.type || 'info'}>
            <StyledToastContent>
              <StyledToastTitle>{t.title}</StyledToastTitle>
              <StyledToastDescription>{t.description}</StyledToastDescription>
            </StyledToastContent>
            <StyledToastClose />
          </StyledToastRoot>
        ))}
      </StyledToastViewport>
    </MuiToast.Portal>
  )
}
