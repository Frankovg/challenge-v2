import { styled } from 'styled-components'

export const TooltipWrapper = styled.span`
  position: relative;
  display: inline-flex;
`

export const TooltipBubble = styled.span<{ $placement: 'top' | 'bottom' }>`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  ${({ $placement }) =>
    $placement === 'top'
      ? 'bottom: calc(100% + 6px);'
      : 'top: calc(100% + 6px);'}
  z-index: var(--z-popover);
  white-space: nowrap;
  pointer-events: none;
  background-color: var(--color-gray-900);
  color: var(--color-white);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  line-height: var(--line-height-tight);
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--radius-sm);
  box-shadow: var(--shadow-md);

  &::after {
    content: '';
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    border: 4px solid transparent;
    ${({ $placement }) =>
      $placement === 'top'
        ? 'top: 100%; border-top-color: var(--color-gray-900);'
        : 'bottom: 100%; border-bottom-color: var(--color-gray-900);'}
  }
`
