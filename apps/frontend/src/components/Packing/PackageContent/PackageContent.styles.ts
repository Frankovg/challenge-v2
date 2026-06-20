import { styled } from 'styled-components'

export const HeaderGrid = styled.div`
  margin-bottom: var(--spacing-sm);
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: var(--spacing-md);
  padding: 0 var(--spacing-xl) 0 var(--spacing-md);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
`

export const HeaderCell = styled.div<{
  $colSpan: number
  $align?: 'left' | 'center' | 'right'
}>`
  grid-column: span ${(props) => props.$colSpan};
  text-align: ${(props) => props.$align || 'left'};
`
