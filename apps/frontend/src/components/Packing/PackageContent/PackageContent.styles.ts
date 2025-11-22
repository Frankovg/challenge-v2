import { styled } from 'styled-components'

export const HeaderGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 1rem;
  padding: 0 1rem;
  margin-right: 0.5rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
`

export const HeaderCell = styled.div<{ $colSpan: number; $align?: 'left' | 'center' | 'right' }>`
  grid-column: span ${props => props.$colSpan};
  text-align: ${props => props.$align || 'left'};
`

