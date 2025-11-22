import React, { type ReactNode } from 'react'

import { HEADER_COLUMNS } from './const'
import { HeaderCell, HeaderGrid } from './PackageContent.styles'

export const PackageContent = ({ children }: { children: ReactNode }): ReactNode => {
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
