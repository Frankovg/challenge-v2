import { styled } from 'styled-components'

export const ScrollAreaContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  overflow-y: auto;
  overflow-x: hidden;
  flex: 1;
  padding-right: 0.5rem;

  /* Scrollbar styling */
  &::-webkit-scrollbar {
    width: 8px;
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
