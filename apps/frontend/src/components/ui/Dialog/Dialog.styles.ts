import { styled } from 'styled-components'

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: var(--z-modal-backdrop);
  -webkit-tap-highlight-color: transparent;
`

export const DialogContent = styled.div`
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
