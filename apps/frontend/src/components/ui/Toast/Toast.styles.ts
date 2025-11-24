import { Toast as MuiToast } from "@base-ui-components/react/toast";
import { styled } from 'styled-components'

export const StyledToastViewport = styled(MuiToast.Viewport)`
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
  outline: none;
  pointer-events: none;

  & > * {
    pointer-events: auto;
  }
`

export const StyledToastRoot = styled(MuiToast.Root)`
  position: relative;
  background-color: var(--bg-primary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
  padding: var(--spacing-md);
  display: grid;
  grid-template-areas: 'content close';
  grid-template-columns: 1fr auto;
  column-gap: var(--spacing-md);
  align-items: start;

  &[data-open] {
    animation: slideIn 150ms cubic-bezier(0.16, 1, 0.3, 1);
  }

  &[data-closed] {
    animation: hide 100ms ease-in;
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

  @keyframes hide {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }

  @keyframes slideIn {
    from {
      transform: translateX(calc(100% + var(--spacing-lg)));
    }
    to {
      transform: translateX(0);
    }
  }
`

export const StyledToastContent = styled(MuiToast.Content)`
  grid-area: content;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
`

export const StyledToastTitle = styled(MuiToast.Title)`
  margin: 0;
  color: var(--text-primary);
  font-weight: var(--font-weight-medium);
  font-size: var(--font-size-sm);
  line-height: var(--line-height-tight);
`

export const StyledToastDescription = styled(MuiToast.Description)`
  margin: 0;
  color: var(--text-secondary);
  font-size: var(--font-size-xs);
  line-height: var(--line-height-normal);
`

export const StyledToastClose = styled(MuiToast.Close)`
  height: 1.25rem;
  width: 1.25rem;
  min-width: 1.25rem;
  border-radius: var(--radius-sm);
  position: absolute;
  top: var(--spacing-sm);
  right: var(--spacing-sm);
  color: var(--text-secondary);
  background-color: transparent;
  border: none;
  cursor: pointer;
  transition: all var(--transition-fast);

  &:hover {
    background-color: var(--bg-hover);
    color: var(--text-primary);
  }

  &:focus-visible {
    outline: 2px solid var(--border-focus);
    outline-offset: 2px;
  }

  &::after {
    content: '×';
    font-size: 20px;
    line-height: 1;
  }
`
