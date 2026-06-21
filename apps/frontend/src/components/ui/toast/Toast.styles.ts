import { styled } from 'styled-components'

export const StyledToastViewport = styled.ol`
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

export const StyledToastRoot = styled.li`
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

export const StyledToastContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
`

export const StyledToastTitle = styled.p`
  margin: 0;
  color: var(--text-primary);
  font-weight: var(--font-weight-medium);
  font-size: var(--font-size-sm);
  line-height: var(--line-height-tight);
`

export const StyledToastDescription = styled.p`
  margin: 0;
  color: var(--text-secondary);
  font-size: var(--font-size-xs);
  line-height: var(--line-height-normal);
`

export const StyledToastClose = styled.button`
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
