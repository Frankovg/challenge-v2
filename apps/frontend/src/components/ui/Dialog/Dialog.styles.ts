import { styled } from 'styled-components'

export const DialogContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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

export const ModalBackdrop = styled.div.withConfig({
  shouldForwardProp: (prop) => !['ownerState', 'open'].includes(prop),
})`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: var(--z-modal-backdrop);
  -webkit-tap-highlight-color: transparent;
`
