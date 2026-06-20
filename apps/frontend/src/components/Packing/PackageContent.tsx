import React, { type ReactNode } from 'react'
import { styled } from 'styled-components'

type HeaderColumn = {
  label: string
  colSpan: number
  align?: 'left' | 'center' | 'right'
}

const HEADER_COLUMNS: HeaderColumn[] = [
  { label: 'SKU', colSpan: 5 },
  { label: 'Location', colSpan: 3 },
  { label: 'Quantity', colSpan: 3, align: 'center' },
  { label: '', colSpan: 1, align: 'center' },
]

const HeaderGrid = styled.div`
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

const HeaderCell = styled.div<{
  $colSpan: number
  $align?: 'left' | 'center' | 'right'
}>`
  grid-column: span ${(props) => props.$colSpan};
  text-align: ${(props) => props.$align || 'left'};
`

export const PackageContent = ({
  children,
}: {
  children: ReactNode
}): ReactNode => {
  return (
    <>
      <HeaderGrid>
        {HEADER_COLUMNS.map((column) => (
          <HeaderCell
            key={column.label}
            $colSpan={column.colSpan}
            $align={column.align}
          >
            {column.label}
          </HeaderCell>
        ))}
      </HeaderGrid>
      {children}
    </>
  )
}
