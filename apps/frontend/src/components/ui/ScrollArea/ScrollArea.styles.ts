import { styled } from 'styled-components'

interface ScrollAreaContainerProps {
  $direction: 'horizontal' | 'vertical'
}

export const ScrollAreaContainer = styled.div<ScrollAreaContainerProps>`
  display: flex;
  flex-direction: ${({ $direction }) => $direction === 'horizontal' ? 'row' : 'column'};
  gap: 0.5rem;
  overflow-y: ${({ $direction }) => $direction === 'vertical' ? 'auto' : 'hidden'};
  overflow-x: ${({ $direction }) => $direction === 'horizontal' ? 'auto' : 'hidden'};
  flex: 1;
  padding-right: ${({ $direction }) => $direction === 'vertical' ? '0.5rem' : '0'};
  padding-bottom: ${({ $direction }) => $direction === 'horizontal' ? '0.5rem' : '0'};

  /* Scrollbar styling */
  &::-webkit-scrollbar {
    width: ${({ $direction }) => $direction === 'vertical' ? '8px' : 'auto'};
    height: ${({ $direction }) => $direction === 'horizontal' ? '8px' : 'auto'};
  }

  &::-webkit-scrollbar-track {
    background: var(--background);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--border);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: var(--text-secondary);
  }
`
